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
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "YOUR_SECRET_KEY_HERE")  # Change in production!
    REFRESH_SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "YOUR_REFRESH_SECRET_KEY_HERE")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(
        os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 7))
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT"))
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_CC_USER = os.getenv("SMTP_CC_USER")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")
    CLOUDFLARE_R2_ENDPOINT = os.getenv("CLOUDFLARE_R2_ENDPOINT")
    CLOUDFLARE_R2_ACCESS_KEY_ID = os.getenv("CLOUDFLARE_R2_ACCESS_KEY_ID")
    CLOUDFLARE_R2_SECRET_ACCESS_KEY = os.getenv(
        "CLOUDFLARE_R2_SECRET_ACCESS_KEY")
    CLOUDFLARE_R2_BUCKET = os.getenv("CLOUDFLARE_R2_BUCKET")
    CLOUDFLARE_R2_PUBLIC_URL = os.getenv(
        "CLOUDFLARE_R2_PUBLIC_URL", f"https://{CLOUDFLARE_R2_BUCKET}.r2.dev")  # Default public URL format
