from dotenv import load_dotenv
import pandas as pd
import requests
import os
load_dotenv()


def download_cloudinary_video(video_url: str, output_path: str = "downloaded_video") -> str:
    """
    Downloads a video from Cloudinary public URL

    Args:
        video_url: Cloudinary public URL of the video
        output_path: Where to save the video (without extension)

    Returns:
        Path to the downloaded video file

    Raises:
        Exception if download fails
    """
    try:
        # Get the file extension from URL
        file_ext = os.path.splitext(video_url.split('/')[-1])[1]
        output_file = f"{output_path}{file_ext}"

        print(f"Downloading video from {video_url}...")

        with requests.get(video_url, stream=True) as r:
            r.raise_for_status()
            with open(output_file, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)

        print(f"Video saved to {output_file}")
        return output_file

    except Exception as e:
        print(f"Failed to download video: {str(e)}")
        raise




# Define all paths clearly
video_path = "data/test_01/eng_01.mp4"
audio_output_path = "data/test_01/chunks"
audio_input_path = "data/test_01/eng_01_extracted_audio.wav"
transcript_output_path = "data/test_01/eng_01_transcription.json"
ppt_path = "data/test_01/eng_01.pptx"
final_topic_path = "data/test_01/eng_01_final_topics.json"
topic_tagged_transcript_output_path = "data/test_01/eng_01_topic_tagged_transcript.json"
topic_smooth_chunks_output_path = "data/test_01/eng_01_topic_smooth_chunks.json"
output_dir = "data/test_01"
highlight_video_name = "eng_01_highlight_video.mp4"
cluster_map_output_path = "data/test_01/eng_01_cluster_map.json"
model = "llama3-70b-8192"
temperature = 0.3
base_url = "https://api.groq.com/openai/v1"
MAX_REQUESTS_PER_MINUTE = 30
MAX_TOKENS_PER_MINUTE = 6000
MIN_CONSECUTIVE_CHUNKS = 3
top_n_content_types = 3
MAX_GAP_CHUNKS = 1

importance_matrix = {
    "Content_Type": ["Theory", "Example", "Exercise", "Q&A"],
    "Math": [0.7, 1.0, 0.9, 0.5],
    "Science": [1.0, 0.8, 0.8, 0.6],
    "Aptitude": [0.5, 1.0, 1.0, 0.5],
    "History": [1.0, 0.7, None, 0.6],
    "eng": [0.8, 1.0, 0.9, 0.5],
    "Computer_Science": [0.9, 1.0, 0.8, 0.6],
}

subjectwise_importance_matrix = pd.DataFrame(importance_matrix)
