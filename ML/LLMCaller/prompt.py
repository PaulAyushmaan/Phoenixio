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
