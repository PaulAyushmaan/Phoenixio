
import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
from pydub import AudioSegment
import logging

logger = logging.getLogger(__name__)

# Initialize model ONCE at module-level to avoid repeated loading
device = "cuda" if torch.cuda.is_available() else "cpu"
logger.info(f"Using device: {device}")
torch_dtype = torch.float16 if device == "cuda" else torch.float32

model_id = "Oriserve/Whisper-Hindi2Hinglish-Swift"

model = AutoModelForSpeechSeq2Seq.from_pretrained(
    model_id,
    torch_dtype=torch_dtype,
    low_cpu_mem_usage=True,
    use_safetensors=True
).to(device)

processor = AutoProcessor.from_pretrained(model_id)

asr_pipe = pipeline(
    "automatic-speech-recognition",
    model=model,
    tokenizer=processor.tokenizer,
    feature_extractor=processor.feature_extractor,
    torch_dtype=torch_dtype,
    device=device,
    return_timestamps=True,
    generate_kwargs={"task": "transcribe"}
)


def seconds_to_hms(seconds):
    """Convert seconds to hours:minutes:seconds format"""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = seconds % 60
    return f"{hours:02d}:{minutes:02d}:{seconds:05.2f}"


def transcribe_audio_chunks(audio_chunk_paths, audio_chunk_duration=20):
    """
    Transcribe multiple audio chunks clearly and return a structured transcript.

    Args:
        audio_chunk_paths (List[str]): List of audio chunk file paths.
        audio_chunk_duration (int): Duration (seconds) of each audio chunk.

    Returns:
        List[dict]: A structured list of transcripts with timestamps.
    """
    try:
        full_transcript = []

        # Calculate total duration (in seconds) for safety
        total_duration_sec = sum(AudioSegment.from_file(
            p).duration_seconds for p in audio_chunk_paths)

        for idx, chunk_path in enumerate(audio_chunk_paths):
            logger.info(
                f"Transcribing chunk {idx + 1}/{len(audio_chunk_paths)}: {chunk_path}")

            result = asr_pipe(chunk_path)

            # Calculate chunk start/end boundaries
            chunk_start_time = idx * audio_chunk_duration
            chunk_end_time = min(
                (idx + 1) * audio_chunk_duration, total_duration_sec)

            for segment in result.get('chunks', []):
                seg_start, seg_end = segment.get('timestamp', (None, None))

                if seg_start is not None and seg_end is not None:
                    adjusted_start = min(
                        seg_start + chunk_start_time, total_duration_sec)
                    adjusted_end = min(
                        seg_end + chunk_start_time, total_duration_sec)
                else:
                    adjusted_start, adjusted_end = chunk_start_time, chunk_end_time

                full_transcript.append({
                    'chunk_id': idx + 1,
                    'start': seconds_to_hms(adjusted_start),
                    'end': seconds_to_hms(adjusted_end),
                    'text': segment['text'].strip()
                })

        return full_transcript

    except Exception as e:
        logger.error(f"Transcription failed: {e}")
        raise
