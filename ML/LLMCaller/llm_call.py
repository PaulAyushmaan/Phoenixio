from openai import OpenAI
from config import MAX_REQUESTS_PER_MINUTE, MAX_TOKENS_PER_MINUTE

import time
import logging

logger = logging.getLogger(__name__)


class Caller:
    def __init__(self, model, api_key: str, temperature: float, base_url: str):
        self.model = model
        self.api_key = api_key
        self.client = OpenAI(api_key=api_key, base_url=base_url)
        self.temperature = temperature
        self.max_requests_per_minute = MAX_REQUESTS_PER_MINUTE
        self.max_tokens_per_minute = MAX_TOKENS_PER_MINUTE
        self.request_counter = 0
        self.token_counter = 0
        self.last_reset_time = time.time()

    def enforce_rate_limit(self, tokens_used):
        now = time.time()
        elapsed = now - self.last_reset_time

        if elapsed >= 60:
            self.request_counter = 0
            self.token_counter = 0
            self.last_reset_time = now

        self.request_counter += 1
        self.token_counter += tokens_used

        if self.request_counter > self.max_requests_per_minute or self.token_counter > self.max_tokens_per_minute:
            wait_time = 60 - elapsed
            logger.info(
                f"Rate limit hit. Sleeping for {wait_time:.2f} seconds.")
            time.sleep(wait_time)
            self.request_counter = 0
            self.token_counter = 0
            self.last_reset_time = time.time()

    def call(self, system_prompt, user_prompt: str) -> str:
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=self.temperature,
            max_tokens=self.max_tokens_per_minute // self.max_requests_per_minute,
        )
        return response.choices[0].message.content.strip()
