import json
import os
from pathlib import Path
from moviepy.video.io.ffmpeg_tools import ffmpeg_extract_subclip


def smooth_topic_transitions(keep_chunks, min_consecutive_chunks):
    """
    Smooth topic transitions by enforcing a minimum number of consecutive chunks before accepting a topic switch.

    Parameters:
    - keep_chunks: List of chunks where keep == true, each with 'chunk_id', 'topic_name', etc.
    - min_consecutive_chunks: Minimum number of consecutive chunks required to accept a topic change.

    Returns:
    - List of updated chunks with smoothed topic_name assignments.
    """
    if not keep_chunks:
        return []

    last_topic = keep_chunks[0]["topic_name"]
    smoothed_chunks = []

    i = 0
    while i < len(keep_chunks):
        chunk = keep_chunks[i]
        if chunk["topic_name"] == last_topic:
            smoothed_chunks.append(chunk)
            i += 1
            continue

        # Check if the next min_consecutive_chunks have the same new topic
        new_topic = chunk["topic_name"]
        consecutive_count = 1

        for j in range(i + 1, min(i + min_consecutive_chunks, len(keep_chunks))):
            if keep_chunks[j]["topic_name"] == new_topic:
                consecutive_count += 1
            else:
                break

        if consecutive_count >= min_consecutive_chunks:
            # Accept the new topic
            for k in range(i, i + consecutive_count):
                keep_chunks[k]["topic_name"] = new_topic
                smoothed_chunks.append(keep_chunks[k])
            last_topic = new_topic
            i += consecutive_count
        else:
            # Force revert to last_topic for these few chunks
            for k in range(i, i + consecutive_count):
                keep_chunks[k]["topic_name"] = last_topic
                smoothed_chunks.append(keep_chunks[k])
            i += consecutive_count

    return smoothed_chunks


def merge_and_save_topic_smoothed_chunks(all_chunks, smoothed_keep_chunks, output_path):
    """
    Merge smoothed keep chunks back into all chunks and save as JSON.

    Parameters:
    - all_chunks: Original full list of transcript chunks.
    - smoothed_keep_chunks: List of keep==true chunks with smoothed topic names.
    - output_path: Path to save the updated JSON file.
    """
    # Build lookup dictionary from smoothed keep chunks
    smoothed_lookup = {chunk["chunk_id"]
        : chunk for chunk in smoothed_keep_chunks}

    updated_chunks = []

    for chunk in all_chunks:
        if chunk["keep"]:
            # Replace with smoothed version
            updated_chunk = smoothed_lookup.get(chunk["chunk_id"], chunk)
            updated_chunks.append(updated_chunk)
        else:
            # Keep original non-keep chunk
            updated_chunks.append(chunk)

    # Save to JSON
    with open(output_path, "w") as f:
        json.dump(updated_chunks, f, indent=2)

    return updated_chunks


def refine_keep(all_chunks):
    """
    Refines 'keep' flags by applying topic-aware continuity rules:
    Ensures all chunks have a consistent 'reason_for_keep_change' key.

    Parameters:
    - all_chunks: List of all transcript chunks with 'keep', 'topic_name', etc.

    Returns:
    - List of updated chunks with refined 'keep' values and consistent reason_for_keep_change field.
    """
    updated_chunks = all_chunks.copy()

    for i in range(1, len(updated_chunks) - 1):
        prev_chunk = updated_chunks[i - 1]
        curr_chunk = updated_chunks[i]
        next_chunk = updated_chunks[i + 1]

        # Rule 1: Fill false gap if both sides are true and same topic
        if (
            curr_chunk["keep"] == False
            and prev_chunk["keep"] == True
            and next_chunk["keep"] == True
            and prev_chunk["topic_name"] == next_chunk["topic_name"]
        ):
            curr_chunk["keep"] = True
            curr_chunk["topic_name"] = prev_chunk["topic_name"]
            curr_chunk["reason_for_keep_change"] = "Sandwiched between same topic"

        # Rule 2: Remove isolated true chunk
        elif (
            curr_chunk["keep"] == True
            and prev_chunk["keep"] == False
            and next_chunk["keep"] == False
        ):
            curr_chunk["keep"] = False
            curr_chunk["reason_for_keep_change"] = "Isolated teaching chunk"

        # Rule 3: Mark unchanged chunks consistently
        elif "reason_for_keep_change" not in curr_chunk or curr_chunk["reason_for_keep_change"] in ("", None):
            curr_chunk["reason_for_keep_change"] = "Original"

    # Ensure first and last chunk also have consistent reason_for_keep_change
    if "reason_for_keep_change" not in updated_chunks[0] or not updated_chunks[0]["reason_for_keep_change"]:
        updated_chunks[0]["reason_for_keep_change"] = "Original"
    if "reason_for_keep_change" not in updated_chunks[-1] or not updated_chunks[-1]["reason_for_keep_change"]:
        updated_chunks[-1]["reason_for_keep_change"] = "Original"

    return updated_chunks


def generate_ordered_highlight_blocks(filtered_chunks, max_gap_chunks=1):
    """
    Groups filtered chunks into flow-respecting continuous blocks based on chunk order.

    Parameters:
    - filtered_chunks: List of filtered chunks with keep == true and valid action_tag.
    - max_gap_chunks: Maximum allowed gap between two chunks to consider them part of the same block.

    Returns:
    - List of highlight blocks: each with cluster_id, topic_name, start_chunk_id, end_chunk_id, segments.
    """
    if not filtered_chunks:
        return []

    # Sort by chunk_id
    sorted_chunks = sorted(filtered_chunks, key=lambda x: x['chunk_id'])

    blocks = []
    current_block = {
        "cluster_id": sorted_chunks[0]["cluster_id"],
        "topic_name": sorted_chunks[0]["topic_name"],
        "start_chunk_id": sorted_chunks[0]["chunk_id"],
        "end_chunk_id": sorted_chunks[0]["chunk_id"],
        "segments": [{"start": sorted_chunks[0]["start"], "end": sorted_chunks[0]["end"]}]
    }

    for i in range(1, len(sorted_chunks)):
        prev = sorted_chunks[i - 1]
        curr = sorted_chunks[i]

        same_cluster = curr["cluster_id"] == prev["cluster_id"]
        small_gap = (curr["chunk_id"] - prev["chunk_id"]) <= max_gap_chunks

        if same_cluster and small_gap:
            current_block["end_chunk_id"] = curr["chunk_id"]
            current_block["segments"].append(
                {"start": curr["start"], "end": curr["end"]})
        else:
            blocks.append(current_block)
            current_block = {
                "cluster_id": curr["cluster_id"],
                "topic_name": curr["topic_name"],
                "start_chunk_id": curr["chunk_id"],
                "end_chunk_id": curr["chunk_id"],
                "segments": [{"start": curr["start"], "end": curr["end"]}]
            }

    blocks.append(current_block)
    return blocks


def _time_str_to_seconds(time_str):
    """
    Converts timestamp string 'HH:MM:SS.xx' to seconds as float.
    """
    h, m, s = time_str.split(":")
    return int(h) * 3600 + int(m) * 60 + float(s)

# def generate_final_highlight_video(video_path, highlight_blocks, output_dir, output_filename):
#     """
#     Creates a single final highlight video by flattening all highlight blocks.

#     Parameters:
#     - video_path: Path to the source video file.
#     - highlight_blocks: List of highlight blocks.
#     - output_dir: Directory to save the final recap video.
#     - output_filename: Name of the final recap video file.

#     Returns:
#     - Path to the final highlight video.
#     """

#     # Step 1: Flatten all segments and sort by start time
#     all_segments = [
#         segment for block in highlight_blocks for segment in block['segments']
#     ]
#     all_segments_sorted = sorted(all_segments, key=lambda seg: _time_str_to_seconds(seg["start"]))

#     # Step 2: Cut all segments into temporary files
#     temp_files = []
#     for idx, segment in enumerate(all_segments_sorted):
#         temp_file = os.path.join(output_dir, f"temp_final_{idx}.mp4")
#         ffmpeg_extract_subclip(
#             video_path,
#             t1=_time_str_to_seconds(segment["start"]),
#             t2=_time_str_to_seconds(segment["end"]),
#             targetname=temp_file
#         )
#         temp_files.append(temp_file)

#     # Step 3: Concatenate all temp files into one
#     temp_concat_path = os.path.join(output_dir, "final_concat_list.txt")

#     try:
#         with open(temp_concat_path, "w") as f:
#             for file in temp_files:
#                 normalized_path = file.replace("\\", "/")  # Ensure ffmpeg-compatible paths
#                 f.write(f"file '{normalized_path}'\n")
#     except IOError as e:
#         raise RuntimeError(f"Failed to write temp concat file: {e}")

#     final_output_path = os.path.join(output_dir, output_filename)
#     try:
#         os.system(f"ffmpeg -f concat -safe 0 -i \"{temp_concat_path}\" -c copy \"{final_output_path}\" -y")
#     except Exception as e:
#         raise RuntimeError(f"Failed to concatenate video segments: {e}")

#     # Cleanup temp files
#     try:
#         for file in temp_files:
#             os.remove(file)
#         os.remove(temp_concat_path)
#     except OSError as e:
#         raise RuntimeError(f"Failed to clean up temporary files: {e}")

#     return 0


def generate_final_highlight_video(video_path, highlight_blocks, output_dir, output_filename):
    """
    Creates a single final highlight video by flattening all highlight blocks.

    Parameters:
    - video_path: Path to the source video file.
    - highlight_blocks: List of highlight blocks.
    - output_dir: Directory to save the final recap video.
    - output_filename: Name of the final recap video file.

    Returns:
    - Path to the final highlight video.
    """

    os.makedirs(output_dir, exist_ok=True)

    # Step 1: Flatten all segments and sort by start time
    all_segments = [
        segment for block in highlight_blocks for segment in block['segments']]
    all_segments_sorted = sorted(
        all_segments, key=lambda seg: _time_str_to_seconds(seg["start"]))

    # Step 2: Cut all segments into temporary files
    temp_files = []
    for idx, segment in enumerate(all_segments_sorted):
        temp_file = Path(output_dir) / f"temp_final_{idx}.mp4"
        temp_file = temp_file.resolve()  # Makes sure it's absolute and cleaned up
        ffmpeg_extract_subclip(
            video_path,
            t1=_time_str_to_seconds(segment["start"]),
            t2=_time_str_to_seconds(segment["end"]),
            targetname=str(temp_file)
        )
        temp_files.append(str(temp_file))

    # Step 3: Concatenate all temp files into one
    temp_concat_path = os.path.join(output_dir, "final_concat_list.txt")
    try:
        with open(temp_concat_path, "w") as f:
            for file in temp_files:
                # Converts to forward slashes always
                normalized_path = Path(file).as_posix()
                f.write(f"file '{normalized_path}'\n")
    except IOError as e:
        raise RuntimeError(f"Failed to write temp concat file: {e}")

    final_output_path = os.path.join(output_dir, output_filename)

    result = os.system(
        f"ffmpeg -f concat -safe 0 -i \"{temp_concat_path}\" -c copy \"{final_output_path}\" -y")
    if result != 0:
        raise RuntimeError("ffmpeg concat command failed.")

    # Cleanup temp files
    try:
        for file in temp_files:
            os.remove(file)
        os.remove(temp_concat_path)
    except OSError as e:
        raise RuntimeError(f"Failed to clean up temporary files: {e}")

    return final_output_path
