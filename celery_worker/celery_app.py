# celery_worker/celery_app.py
# -------------------------------------------------------------
#  Shared Celery instance for Phonexio
#
#  • Reads Redis URL from env  (REDIS_URL)
#  • Defines two logical queues:  meta  and  ml
#  • Auto‑discovers task modules in celery_worker/*
# -------------------------------------------------------------

import os
from celery import Celery

# ---- 1.  Broker & backend (Redis) ------------------------------------------
REDIS_URL = os.getenv("REDIS_URL")

celery_app = Celery(
    "phonexio",                 # app name
    broker=REDIS_URL,
    backend=REDIS_URL,
    include=[
        "celery_worker.tasks_metadata",   # stage‑1 splitter / meta queue
        "celery_worker.tasks_ml",         # stage‑2 whisper / ml queue
    ],
)

# ---- 2.  Global configuration ----------------------------------------------
celery_app.conf.update(
    task_default_queue="meta",            # default queue if none specified
    task_routes={                         # route tasks to queues
        "celery_worker.tasks_metadata.*": {"queue": "meta"},
        "celery_worker.tasks_ml.*":       {"queue": "ml"},
    },
    task_acks_late=True,                  # re‑queue on worker crash
    worker_prefetch_multiplier=1,         # fetch one job at a time (low RAM)
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
)

# Optional: simple health‑check task -----------------------------------------


@celery_app.task(name="ping")
def ping():
    return "pong"
