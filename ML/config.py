from dotenv import load_dotenv
load_dotenv()

# Define all paths clearly
video_path = "data/eng_01.mp4"
audio_output_path = "data/chunks"
audio_input_path = "data/eng_01_extracted_audio.wav"
transcript_output_path = "data/eng_01_transcription.json"
ppt_path = "data/eng_01.pptx"
final_topic_path = "data/eng_01_final_topics.json"
model = "llama3-70b-8192"
temperature = 0.3
base_url="https://api.groq.com/openai/v1"
MAX_REQUESTS_PER_MINUTE = 30
MAX_TOKENS_PER_MINUTE = 6000