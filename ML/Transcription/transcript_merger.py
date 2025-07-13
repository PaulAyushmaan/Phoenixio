

def merge_chunk_transcripts(chunk_transcripts):
    """
    Merge chunk transcripts into a final structured transcript clearly.

    Args:
        chunk_transcripts (List[dict]): List of segments from transcriber.

    Returns:
        dict: Structured merged transcript.
    """

    # full_transcript_text = " ".join(segment['text'] for segment in chunk_transcripts).strip()

    merged_segments = [
        {
            'start': segment['start'],
            'end': segment['end'],
            'text': segment['text']
        }
        for segment in chunk_transcripts
    ]

    merged_transcript = {
        # "full_text": full_transcript_text,
        "segments": merged_segments
    }

    return merged_transcript
