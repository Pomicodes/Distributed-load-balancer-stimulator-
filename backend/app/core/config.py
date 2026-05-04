import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    PROJECT_NAME: str = "Distributed Load Balancer Simulator"
    
    # Redis Configuration
    UPSTASH_REDIS_REST_URL: str = os.getenv("UPSTASH_REDIS_REST_URL", "")
    UPSTASH_REDIS_REST_TOKEN: str = os.getenv("UPSTASH_REDIS_REST_TOKEN", "")
    REDIS_URL: str = os.getenv("REDIS_URL", "") # For standard redis protocol if preferred
    
    # Simulation Settings
    DEFAULT_ALGORITHM: str = os.getenv("DEFAULT_ALGORITHM", "round_robin")
    TRAFFIC_RATE: int = int(os.getenv("TRAFFIC_RATE", "10"))
    NUM_BACKEND_SERVERS: int = int(os.getenv("NUM_BACKEND_SERVERS", "5"))
    
    class Config:
        case_sensitive = True

settings = Settings()
