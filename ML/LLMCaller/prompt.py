import re
def system_prompt_topic_tagging():
    return """You are an expert teaching content classifier.

Your task is to analyze a given transcript segment and perform two actions:

Step 1: Strictly classify if the content is directly related to teaching (important for recap video generation).

- If the content includes direct explanations, examples, exercises, or answering questions, mark it as: Teaching_Content.
- If it contains greetings, announcements, motivational talk, technical setup, chitchat, platform promotion, or unrelated filler, mark it as: Non_Teaching_Content.
- If in doubt, default to Non_Teaching_Content.

Step 2: If classified as Teaching_Content:

- Classify its teaching type as one of:
  - Theory
  - Example
  - Exercise
  - Q&A

- Assign the most relevant topic name from the provided topic list.
  (Only use exact topic names from the list. Do not invent new ones.)

- Estimate a confidence score between 0.0 and 1.0.

---

Your final output format must strictly follow this structure:

- Content_Type: Teaching_Content or Non_Teaching_Content
- Action_Tag: Theory / Example / Exercise / Q&A / n/a
- Topic_Name: [One topic from list] / n/a
- Confidence_Score: [Float value between 0.0 and 1.0]
"""

def build_user_prompt_topic_tagging(chunk_text, topic_list):
    topics_text = "\n".join(topic_list)
    return f"""You are given a transcript segment from a machine learning lecture.

Your task is to classify its teaching relevance and teaching type.

--- Transcript ---
{chunk_text}
--- End Transcript ---

--- Allowed Topic Names ---
{topics_text}
--- End Topic Names ---

Remember:
- If the content is non-teaching, set Action_Tag and Topic_Name as n/a, and Confidence_Score as 0.0.
- Return only the classification fields exactly in the specified format. No extra commentary.
"""

def system_prompt_all_topics():
    return"""You are an expert teaching assistant and curriculum summarizer.

        Your role is to analyze grouped slide content and output 1 to 3 concise topic titles that accurately reflect the specific subjects or sub-topics being directly taught in the provided content.

        Follow these rules carefully:

        - Focus only on what is explicitly taught in the slides.
        - Do not generalize, invent, or infer topics not present.
        - Do not write headings, explanations, or formatting hints.
        - You must output only plain topic titles — one topic per line.

        Each topic title must:

        - Be between 3 to 6 words.
        - Be clear and formal.
        - Not contain examples, instructions, or definitions.
        - Not be preceded by phrases like “Here are the topics:” or “These are the titles:”.
        - Not be numbered or bulleted."""

def build_user_prompt_all_topics(segment_slides):
    return f"""Below is a set of teaching slides grouped together. Extract up to 3 distinct topic titles that best summarize the primary concepts explicitly covered in these slides.

    Strict rules:
    - Return only the topic titles in plain text, one per line.
    - Do not write any other text before or after the topic titles.
    - Do not add numbering, bullet points, or formatting.
    - Do not add commentary, explanations, or section headings.
    - Each topic title must be between 3 to 6 words long.

    --- SLIDES ---
    {segment_slides}
    --- END ---
    """

def system_prompt_final_topics():
    return """You are a curriculum summarization expert.

Your task is to read a list of detailed machine learning sub-topic names and reduce them into 6–8 high-level topic titles suitable as video chapter headings.

Rules:
- Group related sub-topics into a broader topic.
- Keep only 6–8 high-level topic titles.
- Each title must be 3–6 words long, formal and descriptive.
- Do not invent new topics. Only combine and generalize existing ones.
- Do not write any extra text like "Here are the titles" or "Video Chapters:".
- Do not number, bullet, or repeat titles.
- Return only the final topic titles, one per line, nothing else.
"""
def build_user_prompt_final_topics(topic_list):
    topics_text = "\n".join(str(item) for item in list(topic_list))
    return f"""You are given a list of machine learning sub-topic names. Your job is to reduce them into 6–8 clear, concise, non-overlapping high-level topic titles for a video highlight summary.

    --- Sub-Topics ---
    {topics_text}
    --- END ---

    Strict rules:
    - Do not add any other text.
    - Return only the final topic titles, one per line.
    """
def parse_llm_output_to_list(llm_text_output):
    """
    Parses plain LLM output (one topic per line) into a Python list.

    Parameters:
    - llm_text_output: str, raw text returned by LLM (one topic per line)

    Returns:
    - List of cleaned topic strings
    """
    if not llm_text_output or not isinstance(llm_text_output, str):
        return []

    topics = [line.strip() for line in llm_text_output.strip().splitlines() if line.strip()]
    return topics

def parse_topic_tagged_llm_response(llm_output, chunk_id, chunk_start, chunk_end, chunk_text):
    """
    Parses LLM output from merged reasoning prompt and formats it as a structured dict.

    Parameters:
    - llm_output: Raw string returned from LLM.
    - chunk_id: ID of the chunk.
    - chunk_start: Start timestamp as string.
    - chunk_end: End timestamp as string.
    - chunk_text: Original transcript text of the chunk.

    Returns:
    - Dict with structured fields.
    """
    fields = {
        "chunk_id": chunk_id,
        "start": chunk_start,
        "end": chunk_end,
        "text": chunk_text,
        "action_tag": None,
        "topic_name": None,
        "keep": None,
        "confidence_score": None
    }

    # Regex patterns for each field
    patterns = {
        "content_type": r"Content_Type:\s*(Teaching_Content|Non_Teaching_Content)",
        "action_tag": r"Action_Tag:\s*(Theory|Example|Exercise|Q&A|n/a)",
        "topic_name": r"Topic_Name:\s*(.+)",
        "confidence_score": r"Confidence_Score:\s*([\d.]+)"
    }

    for key, pattern in patterns.items():
        match = re.search(pattern, llm_output, re.IGNORECASE)
        if match:
            fields[key if key != "content_type" else "keep"] = match.group(1).strip()

    # Map content_type logic
    fields["keep"] = fields["keep"].lower() == "teaching_content" if fields.get("keep") else False

    if not fields["keep"]:
        fields["action_tag"] = "n/a"
        fields["topic_name"] = "n/a"
        fields["confidence_score"] = 0.0
    else:
        fields["action_tag"] = fields.get("action_tag", "n/a")
        fields["topic_name"] = fields.get("topic_name", "n/a")
        try:
            fields["confidence_score"] = float(fields.get("confidence_score", 0))
        except ValueError:
            fields["confidence_score"] = 0.0

    return fields