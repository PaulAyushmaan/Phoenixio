from transcript.audio_splitter import AudioSplitter
from transcript.audio_transcriber import transcribe_audio_chunks
from transcript.transcript_merger import merge_chunk_transcripts
from TopicSegmentation import TopicExtraction
from LLMCaller.llm_call import Caller
from LLMCaller.prompt import *
from utils import time_to_seconds, assign_cluster_ids_and_build_map
from processor.processing import *
import config
from moviepy.editor import VideoFileClip
import logging
import os
import json
import time

logger = logging.getLogger(__name__)

def run_pipeline():
    try:
        audio_output_path = config.audio_output_path
        audio_input_path = config.audio_input_path
        transcript_output_path = config.transcript_output_path
        ppt_path = config.ppt_path
        final_topic_path = config.final_topic_path
        video_path = config.video_path
        model = config.model
        temperature = config.temperature
        base_url = config.base_url
        topic_tagged_transcript_output_path = config.topic_tagged_transcript_output_path
        topic_smooth_chunks_output_path = config.topic_smooth_chunks_output_path
        min_consecutive_chunks = config.MIN_CONSECUTIVE_CHUNKS
        subjectwise_importance_matrix = config.subjectwise_importance_matrix
        top_n_content_types = config.top_n_content_types
        max_gap_chunks = config.MAX_GAP_CHUNKS
        output_dir = config.output_dir
        highlight_video_name = config.highlight_video_name
        subject = "Computer_Science"  # Example subject, can be parameterized
        # Load environment variables in a file called .env
        api_key = os.getenv("GROQ_API_KEY")
        # Check the key
        if not api_key:
            raise ValueError("API key is not set. Please set the API key in the environment variables.")
        try:
            os.makedirs(audio_output_path, exist_ok=True)
        except OSError as e:
            logger.error(f"Failed to create audio output directory: {e}")
            raise

        # STEP 1: Extract audio clearly
        logger.info("Extracting audio from video...")
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_input_path)
        video.close()
        logger.info("Audio extracted successfully.")

        # STEP 2: Split audio into chunks clearly
        logger.info("Splitting audio into chunks...")
        audio_splitter = AudioSplitter(audio_input_path, audio_output_path, segment_length=20)
        chunk_files = audio_splitter.split_audio()
        logger.info(f"Audio splitting completed. {len(chunk_files)} chunks created.")

        # STEP 3: Transcribe each audio chunk clearly
        logger.info("Transcribing audio chunks...")
        chunk_transcripts = transcribe_audio_chunks(chunk_files, audio_chunk_duration=20)
        logger.info("Transcription completed successfully.")

        # STEP 4: Merge chunk transcripts clearly
        logger.info("Merging chunk transcripts into final transcript...")
        final_transcript = merge_chunk_transcripts(chunk_transcripts)

        # STEP 5: Save merged transcript to JSON clearly
        try:
            with open(transcript_output_path, 'w') as f:
                json.dump(final_transcript, f, indent=2)
        except IOError as e:
            logger.error(f"Failed to save transcript: {e}")
            raise
        logger.info(f"Final merged transcript saved at: {transcript_output_path}")

        # STEP 6: Topic Extraction from Slides
        logger.info("Extracting topics from PowerPoint slides...")
        topic_extractor = TopicExtraction(ppt_path)
        
        slide_text = topic_extractor.extract_slide_text()
        
        if not slide_text:
            logger.warning("Slide text empty. Skipping LLM.")
            return
        window_size = topic_extractor.get_window_size(len(slide_text))
        segmented_slides = topic_extractor.group_slides_by_window(window_size)
        
        llm_caller = Caller(model, api_key, temperature, base_url)

        logger.info("Calling LLM to extract topics from slides...")

        # Extracting Topics from Segmented Slides
        system_prompt_all_topics_text = system_prompt_all_topics()
        topic_list = []
        final_topic_list = []
        for group in segmented_slides:
            group_text = " ".join([slide['text'] for slide in group])
            tokens_estimated = len(group_text.split())

            # group_text = "\n\n".join(s["text"] for s in group)

            llm_caller.enforce_rate_limit(tokens_estimated)
            user_prompt_all_topics = build_user_prompt_all_topics(group_text)
            topics = llm_caller.call(system_prompt_all_topics_text, user_prompt_all_topics)

            for item in parse_llm_output_to_list(topics):
                topic_list.append(item)
        
        # Refining Topic Extraction
        system_prompt_final_topics_text = system_prompt_final_topics()
        user_prompt_final_topics = build_user_prompt_final_topics(topic_list)
        llm_output = llm_caller.call(system_prompt_final_topics_text, user_prompt_final_topics)
        # print(llm_output)
        final_topic_list = parse_llm_output_to_list(llm_output)
        print(final_topic_list)

        logger.info("Topics extracted successfully.")

        # Save final topics to JSON
        try:
            with open(final_topic_path, "w", encoding="utf-8") as f:
                json.dump(final_topic_list, f, indent=2, ensure_ascii=False)
        except IOError as e:
            logger.error(f"Failed to save final topics: {e}")
            raise

        logger.info(f"Final topic list saved at: {final_topic_path}")

        # STEP 7: Tagging Topics for Transcript Chunks with LLM
        logger.info("Processing transcript tagging with LLM...")
        system_prompt_topic_tagging_text = system_prompt_topic_tagging()

        processed_results = []

        for chunk_id, chunk in enumerate(final_transcript["segments"], start=1):
            chunk['chunk_id'] = chunk_id
            user_prompt_topic_tagging = build_user_prompt_topic_tagging(chunk['text'], final_topic_list)
            llm_output = llm_caller.call(system_prompt_topic_tagging_text, user_prompt_topic_tagging)

            structured_result = parse_topic_tagged_llm_response(
                llm_output,
                chunk_id=chunk['chunk_id'],
                chunk_start=chunk['start'],
                chunk_end=chunk['end'],
                chunk_text=chunk['text']
            )

            processed_results.append(structured_result)
            time.sleep(2)

        # Save processed results to JSON
        try:
            with open(topic_tagged_transcript_output_path, "w", encoding="utf-8") as f:
                json.dump(processed_results, f, indent=2, ensure_ascii=False)
        except IOError as e:
            logger.error(f"Failed to save processed transcript: {e}")
            raise
        logger.info(f"Topic-tagged transcript saved at: {topic_tagged_transcript_output_path}")
        logger.info("Transcript tagging completed successfully.")
        
        # Analyze the results
        false_chunks = [chunk for chunk in processed_results if chunk.get("keep") is False]
        total_false_duration = sum(
            time_to_seconds(chunk['end']) - time_to_seconds(chunk['start'])
            for chunk in false_chunks
        )

        true_chunks = [chunk for chunk in processed_results if chunk.get("keep") is True]
        total_true_duration = sum(
            time_to_seconds(chunk['end']) - time_to_seconds(chunk['start'])
            for chunk in true_chunks
        )

        logger.info(f"Total teaching chunks: {len(true_chunks)}")
        logger.info(f"Total teaching time: {total_true_duration} seconds ({total_true_duration / 60:.2f} minutes)")

        logger.info(f"Total non-teaching chunks: {len(false_chunks)}")
        logger.info(f"Total non-teaching time: {total_false_duration} seconds ({total_false_duration / 60:.2f} minutes)")

        # STEP 8: Smooth topic transitions
        logger.info("Smoothing topic transitions...")
        keep_chunks = [chunk for chunk in processed_results if chunk['keep']]
        smoothed_keep_chunks = smooth_topic_transitions(keep_chunks, min_consecutive_chunks)

        processed_results = merge_and_save_topic_smoothed_chunks(processed_results, smoothed_keep_chunks, topic_smooth_chunks_output_path)
        logger.info(f"Smoothed topic chunks saved at: {topic_smooth_chunks_output_path}")

        # STEP 9: Refine 'keep' flags with topic awareness
        logger.info("Refining 'keep' flags with topic awareness...")
        processed_results = refine_keep(processed_results)

        # STEP 10: Assign cluster IDs and build cluster map
        logger.info("Assigning cluster IDs and building cluster map...")
        processed_results, cluster_map = assign_cluster_ids_and_build_map(processed_results)

        try:
            with open("data/cluster_map.json", "w", encoding="utf-8") as f:
                json.dump(cluster_map, f, indent=2, ensure_ascii=False)
        except IOError as e:
            logger.error(f"Failed to save cluster map: {e}")
            raise
        logger.info("Cluster IDs assigned and map created successfully.")

        # STEP 11: Post-Processing
        subject_weights = subjectwise_importance_matrix[["Content_Type", subject]].dropna()
        top_n = subject_weights.sort_values(by=subject, ascending=False).head(top_n_content_types)
        subject_wise_top_n_content_types = top_n["Content_Type"].tolist()
        final_processed_results = [chunk for chunk in processed_results if chunk["action_tag"] in subject_wise_top_n_content_types]
        grouped_chunks = generate_ordered_highlight_blocks(final_processed_results, max_gap_chunks)

        #STEP 12: Generate highlight video
        logger.info("Generating highlight video...")
        generate_final_highlight_video(
            video_path,
            grouped_chunks,
            output_dir,
            highlight_video_name
        )
        logger.info(f"Highlight video generated successfully at: {os.path.join(output_dir, highlight_video_name)}")
        
        logger.info("Pipeline executed successfully")

    except Exception as e:
        logger.error(f"Pipeline execution failed: {e}")
        raise
