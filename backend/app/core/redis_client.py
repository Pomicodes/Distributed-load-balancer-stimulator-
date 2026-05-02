import redis
import json
from typing import Any, Dict, List, Optional
from app.core.config import settings
from upstash_redis import Redis as UpstashRedis

class RedisClient:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(RedisClient, cls).__new__(cls)
            cls._instance._init_client()
        return cls._instance

    def _init_client(self):
        # Use standard Redis protocol if URL is provided, otherwise fallback to Upstash REST
        if settings.REDIS_URL:
            self.client = redis.from_url(settings.REDIS_URL, decode_responses=True)
            self.is_rest = False
        elif settings.UPSTASH_REDIS_REST_URL and settings.UPSTASH_REDIS_REST_TOKEN:
            self.client = UpstashRedis(
                url=settings.UPSTASH_REDIS_REST_URL, 
                token=settings.UPSTASH_REDIS_REST_TOKEN
            )
            self.is_rest = True
        else:
            # Default to localhost for development if nothing is provided
            print("WARNING: No Redis credentials provided. Falling back to localhost:6379")
            self.client = redis.Redis(host='localhost', port=6379, decode_responses=True)
            self.is_rest = False

    def set(self, key: str, value: Any, expire: Optional[int] = None):
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        
        if self.is_rest:
            return self.client.set(key, value, ex=expire)
        else:
            return self.client.set(key, value, ex=expire)

    def get(self, key: str) -> Optional[Any]:
        value = self.client.get(key)
        if value is None:
            return None
        
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value

    def hset(self, name: str, key: str, value: Any):
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        return self.client.hset(name, key, value)

    def hget(self, name: str, key: str) -> Optional[Any]:
        value = self.client.hget(name, key)
        if value is None:
            return None
        
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value

    def hgetall(self, name: str) -> Dict[str, Any]:
        data = self.client.hgetall(name)
        result = {}
        for k, v in data.items():
            try:
                result[k] = json.loads(v)
            except (json.JSONDecodeError, TypeError):
                result[k] = v
        return result

    def incr(self, key: str):
        return self.client.incr(key)

    def publish(self, channel: str, message: Any):
        if isinstance(message, (dict, list)):
            message = json.dumps(message)
        
        if self.is_rest:
            # Upstash REST supports publish via a different method usually, 
            # but upstash-redis lib handles it.
            return self.client.publish(channel, message)
        else:
            return self.client.publish(channel, message)

redis_client = RedisClient()
