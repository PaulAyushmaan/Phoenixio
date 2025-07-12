from datetime import timedelta
import json
import logging
import os


def setup_logging(log_file_path="logs/pipeline.log"):
    os.makedirs(os.path.dirname(log_file_path), exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        handlers=[
            logging.FileHandler(log_file_path, mode="a"),
            logging.StreamHandler()
        ]
    )


with open("F:\hackathon\Phoenixio\ML\data\eng_01_on_off_topic.json", "r", encoding="utf-8") as f:
    result = json.load(f)

def timestamp_to_seconds(ts):
    """Converts a timestamp string like '00:01:30.25' to total seconds as float."""
    try:
        h, m, s = ts.split(':')
        return int(h) * 3600 + int(m) * 60 + float(s)
    except:
        return 0.0
    
def time_to_seconds(t):
            """Converts 'HH:MM:SS.xx' to seconds"""
            t = t.split('.')[0]  # Ignore milliseconds if present
            h, m, s = map(int, t.split(':'))
            return h * 3600 + m * 60 + s

def assign_cluster_ids_and_build_map(all_chunks):
    """
    Assigns cluster IDs to chunks based on topic_name and builds a cluster map.

    Parameters:
    - all_chunks: List of all transcript chunks with 'topic_name'.

    Returns:
    - updated_chunks: List with 'cluster_id' added to each chunk.
    - cluster_map: Dict with cluster_id as key, storing topic_name and chunk_id list.
    """
    topic_to_cluster_id = {}
    cluster_map = {}
    cluster_counter = 1

    updated_chunks = []

    for chunk in all_chunks:
        topic = chunk.get("topic_name", "n/a")

        if topic not in topic_to_cluster_id and topic != "n/a":
            topic_to_cluster_id[topic] = cluster_counter
            cluster_map[cluster_counter] = {
                "topic_name": topic,
                "chunk_ids": []
            }
            cluster_counter += 1

        if topic != "n/a":
            cluster_id = topic_to_cluster_id[topic]
            chunk["cluster_id"] = cluster_id
            cluster_map[cluster_id]["chunk_ids"].append(chunk["chunk_id"])
        else:
            chunk["cluster_id"] = None

        updated_chunks.append(chunk)

    return updated_chunks, cluster_map
