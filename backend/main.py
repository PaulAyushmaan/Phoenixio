# Standard library imports
# (None in this case)

# Third-party library imports
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from mongoengine import connect
from mangum import Mangum

# Local application imports
from dependencies.configuration import AppConfiguration
from dependencies.middleware_log import log_middleware
from routes.user_router import (
    auth_router,
)
from routes.course_router import course_router
from routes.lecture_router import lecture_router

# Initialize FastAPI app
app = FastAPI(title="Phoenixio API")
app.add_middleware(BaseHTTPMiddleware, dispatch=log_middleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Need to Specify frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connect(
    db=AppConfiguration.MAIN_DB,
    host=AppConfiguration.MONGO_URI,
    alias="Phoenixio_db",
    tlsAllowInvalidCertificates=True
)


@app.get("/")
def read_root():
    return {"message": "Welcome to Phoenixio!"}


# Register routers
app.include_router(auth_router)
app.include_router(course_router)
app.include_router(lecture_router)

handler = Mangum(app)

if __name__ == "__main__":
    uvicorn.run(
        app, host="127.0.0.1",
        port=8000, log_level="info",
        workers=1, timeout_keep_alive=5
    )
