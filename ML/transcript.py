# ✅ STEP 1: EXTRACT AUDIO FROM VIDEO
from moviepy import VideoFileClip
import os
from pydub import AudioSegment
import torch
from transformers import AutoModelForSpeechSeq2Seq, AutoProcessor, pipeline
import json

# Change to your video path
video_path = "data/bio.mp4"
audio_path = "data/extracted_audio.wav"

# Extract audio from video
video = VideoFileClip(video_path)
video.audio.write_audiofile(audio_path)
video.close()

# ✅ STEP 2: SPLIT AUDIO INTO 30s CHUNKS


audio = AudioSegment.from_file(audio_path)
chunk_length_ms = 30 * 1000  # 30 seconds
total_duration_ms = len(audio)  # Get actual duration in milliseconds

# Calculate chunks respecting actual duration
chunks = []
for i in range(0, total_duration_ms, chunk_length_ms):
    # Don't exceed total duration
    end = min(i + chunk_length_ms, total_duration_ms)
    chunks.append(audio[i:end])

os.makedirs("data/chunks", exist_ok=True)
chunk_paths = []
for idx, chunk in enumerate(chunks):
    path = f"data/chunks/chunk_{idx}.wav"
    chunk.export(path, format="wav")
    chunk_paths.append(path)

# ✅ STEP 3: TRANSCRIBE USING ORISERVE WITH TIMESTAMPS


device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")
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
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    seconds = seconds % 60
    return f"{int(hours):02d}:{int(minutes):02d}:{seconds:05.2f}"

# ✅ STEP 4: PROCESS AND SAVE AS JSON


full_transcript = []
for idx, path in enumerate(chunk_paths):
    print(f"🔁 Transcribing: {path}")
    result = asr_pipe(path)
    chunk_start = idx * 30  # Each chunk is 30 seconds
    chunk_end = min(chunk_start + 30, total_duration_ms /
                    1000)  # Respect video duration
    for segment in result['chunks']:
        # Handle missing timestamps
        if segment['timestamp'] is None or None in segment['timestamp']:
            print(
                f"⚠️ Missing timestamp in chunk {idx}, using chunk boundaries")
            start, end = chunk_start, chunk_end
        else:
            # Adjust timestamps relative to full audio
            start = min(segment['timestamp'][0] +
                        chunk_start, total_duration_ms / 1000)
            end = min(segment['timestamp'][1] +
                      chunk_start, total_duration_ms / 1000)

        full_transcript.append({
            'start': seconds_to_hms(start),
            'end': seconds_to_hms(end),
            'text': segment['text']
        })

# Save as JSON
with open("data/video_transcript1.json", "w", encoding='utf-8') as f:
    json.dump(full_transcript, f, indent=2, ensure_ascii=False)

print("✅ Video transcription complete with timestamps")
print("📄 JSON file saved as: video_transcript.json")
print("\nSample Output:")
print(json.dumps(full_transcript[:2], indent=2, ensure_ascii=False))
