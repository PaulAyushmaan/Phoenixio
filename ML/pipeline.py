from transcript.audio_splitter import AudioSplitter
from transcript.audio_transcriber import transcribe_audio_chunks
from transcript.transcript_merger import merge_chunk_transcripts
from TopicSegmentation import TopicExtraction
from LLMCaller.llm_call import Caller
from LLMCaller.prompt import *
import config
from moviepy.editor import VideoFileClip
import logging
import os
import json

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

        # Load environment variables in a file called .env
        api_key = os.getenv("GROQ_API_KEY")
        # Check the key
        if not api_key:
            raise ValueError("API key is not set. Please set the API key in the environment variables.")
        
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
        logger.info("Pipeline executed successfully")

    except Exception as e:
        logger.error(f"Pipeline execution failed: {e}")
        raise
