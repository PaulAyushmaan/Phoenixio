import logging
import os
from pydub import AudioSegment

logger = logging.getLogger(__name__)

class AudioSplitter:
    def __init__(self, audio_input_path, audio_output_path, segment_length=20):
        self.audio_input_path = audio_input_path
        self.audio_output_path = audio_output_path
        self.segment_length = segment_length

    def split_audio(self):
        audio = AudioSegment.from_file(self.audio_input_path)
        chunk_length_ms = self.segment_length * 1000
        total_duration_ms = len(audio)

        chunks = []
        for i in range(0, total_duration_ms, chunk_length_ms):
            end = min(i + chunk_length_ms, total_duration_ms)
            chunks.append(audio[i:end])

        chunk_paths = []
        for idx, chunk in enumerate(chunks):
            path = os.path.join(self.audio_output_path, f"chunk_{idx}.wav")
            chunk.export(path, format="wav")
            chunk_paths.append(path)
            logger.info(f"Exported chunk: {path}")

        return chunk_paths
