import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class AppConfiguration:
    """
    Configuration class for the application.
    """
    MONGO_URI = os.environ["MONGO_URI"]
    MAIN_DB = os.environ["MAIN_DB"]
