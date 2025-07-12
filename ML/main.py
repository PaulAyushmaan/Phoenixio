from pipeline import run_pipeline
import logging
from ML.utility import setup_logging

logger = logging.getLogger(__name__)

if __name__ == "__main__":
    setup_logging()

    try:
        logger.info("Starting the video highlights pipeline...")
        run_pipeline()
        logger.info("Pipeline completed successfully!")

    except Exception as e:
        logger.critical(f"Pipeline failed with error: {e}")
