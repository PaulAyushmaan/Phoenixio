from transcript.audio_splitter import AudioSplitter
from transcript.audio_transcriber import transcribe_audio_chunks
from transcript.transcript_merger import merge_chunk_transcripts
from moviepy.editor import VideoFileClip
import logging
import os
import json

logger = logging.getLogger(__name__)

def run_pipeline():
    try:
        # Define all paths clearly
        video_path = "data/graphics_01.mp4"
        audio_output_path = "data/chunks"
        audio_input_path = "data/graphics_01_extracted_audio.wav"
        transcript_output_path = "data/graphics_01_transcription.json"
        
        os.makedirs(audio_output_path, exist_ok=True)

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
        with open(transcript_output_path, 'w') as f:
            json.dump(final_transcript, f, indent=2)
        logger.info(f"Final merged transcript saved at: {transcript_output_path}")

        logger.info("Pipeline executed successfully")

    except Exception as e:
        logger.error(f"Pipeline execution failed: {e}")
        raise
