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

def calculate_kept_duration(tagged_chunks):
    """
    Calculates total duration of chunks marked as keep=True.
    Handles both numeric and HH:MM:SS.ms timestamp formats.
    """
    total_duration = 0.0

    for chunk in tagged_chunks:
        if chunk.get("keep"):
            try:
                start = chunk.get("start", 0)
                end = chunk.get("end", 0)

                # Convert if in HH:MM:SS or string format
                if isinstance(start, str):
                    start = timestamp_to_seconds(start)
                if isinstance(end, str):
                    end = timestamp_to_seconds(end)

                total_duration += max(0, end - start)
            except Exception as e:
                print(f"Error processing chunk {chunk.get('chunk_id')}: {e}")

    return round(total_duration, 2)

print(calculate_kept_duration(result))

def analyze_removed_segments(tagged_chunks):
    """
    Analyze non-kept segments:
    - Total number of non-kept chunks
    - Total duration of removed content
    - Number of interruptions (contiguous non-kept blocks)
    """
    removed_duration = 0.0
    removed_chunks = 0
    interruptions = 0
    in_removal_block = False

    for chunk in tagged_chunks:
        keep = chunk.get("keep", False)

        if not keep:
            removed_chunks += 1

            # Parse timestamps
            start = chunk.get("start", 0)
            end = chunk.get("end", 0)

            if isinstance(start, str):
                start = timestamp_to_seconds(start)
            if isinstance(end, str):
                end = timestamp_to_seconds(end)

            removed_duration += max(0, end - start)

            # Count interruption block
            if not in_removal_block:
                interruptions += 1
                in_removal_block = True
        else:
            in_removal_block = False

    return {
        "removed_chunks": removed_chunks,
        "removed_duration_sec": round(removed_duration, 2),
        "interruptions": interruptions
    }

print(analyze_removed_segments(result))

def get_segment_decisions(tagged_chunks):
    """
    Returns a list of time intervals with KEEP / CUT label.
    Example:
    00:00:00 - 00:00:15 KEEP
    00:00:15 - 00:00:30 CUT
    """
    output = []

    for chunk in tagged_chunks:
        start = chunk.get("start", "0")
        end = chunk.get("end", "0")
        keep = chunk.get("keep", False)

        label = "KEEP" if keep else "CUT"
        output.append(f"{start} - {end} {label}")

    return output

# print(get_segment_decisions(result))
