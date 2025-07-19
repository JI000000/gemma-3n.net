---
title: "Building a Chatbot with Gemma 3n and FastAPI: Complete Production Guide"
title_zh: "使用Gemma 3n和FastAPI构建聊天机器人：完整生产指南"
description: "Learn how to build a production-ready chatbot using Gemma 3n and FastAPI. This comprehensive guide covers API design, streaming responses, error handling, and deployment strategies."
description_zh: "学习如何使用Gemma 3n和FastAPI构建生产就绪的聊天机器人。本全面指南涵盖API设计、流式响应、错误处理和部署策略。"
pubDate: 2025-07-19
lastUpdated: 2025-07-19
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "FastAPI", "Chatbot", "API", "Streaming", "Production", "Tutorial", "Python"]
draft: false
lang: "en"
---

Building a chatbot with Gemma 3n and FastAPI is one of the most practical ways to deploy AI models in production. This comprehensive guide will walk you through creating a robust, scalable chatbot that can handle real-world traffic while maintaining excellent performance.

Whether you're building a customer service bot, a coding assistant, or a creative writing companion, this tutorial provides everything you need to go from concept to production deployment.

## Why Gemma 3n + FastAPI?

The combination of Gemma 3n and FastAPI offers several advantages:

- **Efficiency**: Gemma 3n's optimized architecture runs smoothly on consumer hardware
- **Speed**: FastAPI's async capabilities provide excellent performance
- **Scalability**: Easy to scale from development to production
- **Developer Experience**: FastAPI's automatic documentation and type checking
- **Real-time**: Built-in support for streaming responses

## Project Structure

Let's start by setting up our project structure:

```
gemma-chatbot/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   └── config.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── gemma_service.py
│   │   └── chat_service.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   └── health.py
│   └── utils/
│       ├── __init__.py
│       ├── logger.py
│       └── rate_limiter.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Step 1: Setting Up the Environment

First, let's create our requirements file:

```txt
# requirements.txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
transformers==4.36.0
torch==2.1.0
accelerate==0.25.0
bitsandbytes==0.41.0
pydantic==2.5.0
python-multipart==0.0.6
redis==5.0.1
prometheus-client==0.19.0
structlog==23.2.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-dotenv==1.0.0
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

## Step 2: Configuration Management

Let's create our configuration system:

```python
# app/models/config.py
from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Model Configuration
    model_name: str = "google/gemma-3n-4b-it"
    model_device: str = "auto"
    max_tokens: int = 512
    temperature: float = 0.7
    top_p: float = 0.9
    top_k: int = 40
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_workers: int = 1
    
    # Security
    secret_key: str = "your-secret-key-here"
    access_token_expire_minutes: int = 30
    
    # Rate Limiting
    rate_limit_per_minute: int = 60
    rate_limit_per_hour: int = 1000
    
    # Redis Configuration
    redis_url: str = "redis://localhost:6379"
    
    # Logging
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

## Step 3: Chat Models and Schemas

Define our data models:

```python
# app/models/chat.py
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"

class Message(BaseModel):
    role: MessageRole
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    messages: List[Message]
    stream: bool = False
    max_tokens: Optional[int] = None
    temperature: Optional[float] = None
    top_p: Optional[float] = None
    top_k: Optional[int] = None

class ChatResponse(BaseModel):
    message: Message
    usage: Dict[str, Any]
    finish_reason: str

class StreamResponse(BaseModel):
    content: str
    finish_reason: Optional[str] = None
    usage: Optional[Dict[str, Any]] = None

class ChatSession(BaseModel):
    session_id: str
    messages: List[Message]
    created_at: datetime
    updated_at: datetime
    metadata: Dict[str, Any] = {}
```

## Step 4: Gemma Service Implementation

Create the core AI service:

```python
# app/services/gemma_service.py
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from typing import List, Dict, Any, Generator
import logging
from app.models.chat import Message, MessageRole, ChatRequest
from app.models.config import settings

logger = logging.getLogger(__name__)

class GemmaService:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.device = None
        self._load_model()
    
    def _load_model(self):
        """Load and configure the Gemma 3n model"""
        try:
            logger.info(f"Loading model: {settings.model_name}")
            
            # Configure quantization for memory efficiency
            bnb_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_quant_type="nf4",
                bnb_4bit_compute_dtype=torch.float16,
                bnb_4bit_use_double_quant=True,
            )
            
            # Load model with optimizations
            self.model = AutoModelForCausalLM.from_pretrained(
                settings.model_name,
                quantization_config=bnb_config,
                device_map=settings.model_device,
                torch_dtype=torch.float16,
                attn_implementation="flash_attention_2"
            )
            
            # Load tokenizer
            self.tokenizer = AutoTokenizer.from_pretrained(settings.model_name)
            self.tokenizer.pad_token = self.tokenizer.eos_token
            
            logger.info("Model loaded successfully")
            
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            raise
    
    def _format_messages(self, messages: List[Message]) -> str:
        """Convert message list to prompt string"""
        formatted = ""
        for message in messages:
            if message.role == MessageRole.SYSTEM:
                formatted += f"System: {message.content}\n\n"
            elif message.role == MessageRole.USER:
                formatted += f"User: {message.content}\n\n"
            elif message.role == MessageRole.ASSISTANT:
                formatted += f"Assistant: {message.content}\n\n"
        
        formatted += "Assistant: "
        return formatted
    
    def _get_generation_params(self, request: ChatRequest) -> Dict[str, Any]:
        """Get generation parameters from request or defaults"""
        return {
            "max_new_tokens": request.max_tokens or settings.max_tokens,
            "temperature": request.temperature or settings.temperature,
            "top_p": request.top_p or settings.top_p,
            "top_k": request.top_k or settings.top_k,
            "do_sample": True,
            "pad_token_id": self.tokenizer.eos_token_id,
            "eos_token_id": self.tokenizer.eos_token_id,
        }
    
    def generate_response(self, request: ChatRequest) -> Dict[str, Any]:
        """Generate a single response"""
        try:
            # Format the conversation
            prompt = self._format_messages(request.messages)
            
            # Tokenize input
            inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
            
            # Get generation parameters
            gen_params = self._get_generation_params(request)
            
            # Generate response
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    **gen_params
                )
            
            # Decode response
            response_text = self.tokenizer.decode(
                outputs[0][inputs['input_ids'].shape[1]:], 
                skip_special_tokens=True
            )
            
            # Calculate usage
            input_tokens = inputs['input_ids'].shape[1]
            output_tokens = outputs.shape[1] - input_tokens
            total_tokens = outputs.shape[1]
            
            usage = {
                "prompt_tokens": input_tokens,
                "completion_tokens": output_tokens,
                "total_tokens": total_tokens
            }
            
            return {
                "content": response_text.strip(),
                "usage": usage,
                "finish_reason": "stop"
            }
            
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            raise
    
    def generate_stream(self, request: ChatRequest) -> Generator[Dict[str, Any], None, None]:
        """Generate streaming response"""
        try:
            # Format the conversation
            prompt = self._format_messages(request.messages)
            
            # Tokenize input
            inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
            
            # Get generation parameters
            gen_params = self._get_generation_params(request)
            
            # Stream generation
            streamer = None
            generated_text = ""
            
            for outputs in self.model.generate(
                **inputs,
                **gen_params,
                return_dict_in_generate=True,
                output_scores=False,
                streamer=streamer
            ):
                if outputs.sequences is not None:
                    # Decode new tokens
                    new_tokens = outputs.sequences[0][inputs['input_ids'].shape[1]:]
                    new_text = self.tokenizer.decode(new_tokens, skip_special_tokens=True)
                    
                    # Yield new content
                    if new_text:
                        generated_text += new_text
                        yield {
                            "content": new_text,
                            "finish_reason": None,
                            "usage": None
                        }
            
            # Calculate final usage
            input_tokens = inputs['input_ids'].shape[1]
            output_tokens = len(self.tokenizer.encode(generated_text))
            total_tokens = input_tokens + output_tokens
            
            usage = {
                "prompt_tokens": input_tokens,
                "completion_tokens": output_tokens,
                "total_tokens": total_tokens
            }
            
            # Yield final message
            yield {
                "content": "",
                "finish_reason": "stop",
                "usage": usage
            }
            
        except Exception as e:
            logger.error(f"Error in streaming generation: {e}")
            yield {
                "content": "",
                "finish_reason": "error",
                "usage": None
            }
```

## Step 5: Chat Service Implementation

Create the chat management service:

```python
# app/services/chat_service.py
import uuid
from datetime import datetime
from typing import List, Optional, Dict, Any
import redis
import json
from app.models.chat import ChatSession, Message, MessageRole
from app.models.config import settings
from app.services.gemma_service import GemmaService
import logging

logger = logging.getLogger(__name__)

class ChatService:
    def __init__(self):
        self.gemma_service = GemmaService()
        self.redis_client = redis.from_url(settings.redis_url)
    
    def create_session(self, user_id: str, metadata: Dict[str, Any] = None) -> ChatSession:
        """Create a new chat session"""
        session_id = str(uuid.uuid4())
        session = ChatSession(
            session_id=session_id,
            messages=[],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            metadata=metadata or {}
        )
        
        # Store in Redis
        self.redis_client.setex(
            f"session:{session_id}",
            3600,  # 1 hour TTL
            session.model_dump_json()
        )
        
        return session
    
    def get_session(self, session_id: str) -> Optional[ChatSession]:
        """Retrieve a chat session"""
        try:
            session_data = self.redis_client.get(f"session:{session_id}")
            if session_data:
                return ChatSession.model_validate_json(session_data)
        except Exception as e:
            logger.error(f"Error retrieving session {session_id}: {e}")
        
        return None
    
    def add_message(self, session_id: str, message: Message) -> bool:
        """Add a message to a session"""
        try:
            session = self.get_session(session_id)
            if not session:
                return False
            
            session.messages.append(message)
            session.updated_at = datetime.utcnow()
            
            # Update in Redis
            self.redis_client.setex(
                f"session:{session_id}",
                3600,
                session.model_dump_json()
            )
            
            return True
        except Exception as e:
            logger.error(f"Error adding message to session {session_id}: {e}")
            return False
    
    def get_conversation_history(self, session_id: str, limit: int = 10) -> List[Message]:
        """Get recent conversation history"""
        session = self.get_session(session_id)
        if not session:
            return []
        
        return session.messages[-limit:]
    
    def clear_session(self, session_id: str) -> bool:
        """Clear a chat session"""
        try:
            self.redis_client.delete(f"session:{session_id}")
            return True
        except Exception as e:
            logger.error(f"Error clearing session {session_id}: {e}")
            return False
```

## Step 6: API Endpoints

Create the FastAPI endpoints:

```python
# app/api/chat.py
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from fastapi.responses import StreamingResponse
from typing import List
import json
from app.models.chat import ChatRequest, ChatResponse, StreamResponse, ChatSession
from app.services.chat_service import ChatService
from app.utils.rate_limiter import rate_limit
from app.utils.logger import get_logger

logger = get_logger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])

# Dependency injection
def get_chat_service() -> ChatService:
    return ChatService()

@router.post("/sessions", response_model=ChatSession)
async def create_chat_session(
    metadata: dict = None,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Create a new chat session"""
    try:
        session = chat_service.create_session(
            user_id="anonymous",  # In production, get from auth
            metadata=metadata or {}
        )
        return session
    except Exception as e:
        logger.error(f"Error creating session: {e}")
        raise HTTPException(status_code=500, detail="Failed to create session")

@router.get("/sessions/{session_id}", response_model=ChatSession)
async def get_chat_session(
    session_id: str,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Get a chat session"""
    session = chat_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.post("/sessions/{session_id}/messages", response_model=ChatResponse)
@rate_limit(max_requests=60, window_seconds=60)
async def send_message(
    session_id: str,
    request: ChatRequest,
    background_tasks: BackgroundTasks,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Send a message and get a response"""
    try:
        # Validate session exists
        session = chat_service.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Add user message to session
        if request.messages:
            last_message = request.messages[-1]
            chat_service.add_message(session_id, last_message)
        
        # Generate response
        if request.stream:
            raise HTTPException(status_code=400, detail="Use /stream endpoint for streaming")
        
        response_data = chat_service.gemma_service.generate_response(request)
        
        # Create assistant message
        assistant_message = Message(
            role=MessageRole.ASSISTANT,
            content=response_data["content"]
        )
        
        # Add to session
        chat_service.add_message(session_id, assistant_message)
        
        return ChatResponse(
            message=assistant_message,
            usage=response_data["usage"],
            finish_reason=response_data["finish_reason"]
        )
        
    except Exception as e:
        logger.error(f"Error processing message: {e}")
        raise HTTPException(status_code=500, detail="Failed to process message")

@router.post("/sessions/{session_id}/stream")
@rate_limit(max_requests=60, window_seconds=60)
async def stream_message(
    session_id: str,
    request: ChatRequest,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Stream a message response"""
    try:
        # Validate session exists
        session = chat_service.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Add user message to session
        if request.messages:
            last_message = request.messages[-1]
            chat_service.add_message(session_id, last_message)
        
        def generate_stream():
            try:
                for chunk in chat_service.gemma_service.generate_stream(request):
                    yield f"data: {json.dumps(chunk)}\n\n"
                
                # Add final assistant message to session
                if chunk and chunk.get("content"):
                    assistant_message = Message(
                        role=MessageRole.ASSISTANT,
                        content=chunk["content"]
                    )
                    chat_service.add_message(session_id, assistant_message)
                    
            except Exception as e:
                logger.error(f"Error in stream generation: {e}")
                error_chunk = {
                    "content": "",
                    "finish_reason": "error",
                    "error": str(e)
                }
                yield f"data: {json.dumps(error_chunk)}\n\n"
        
        return StreamingResponse(
            generate_stream(),
            media_type="text/plain",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Content-Type": "text/event-stream"
            }
        )
        
    except Exception as e:
        logger.error(f"Error in stream endpoint: {e}")
        raise HTTPException(status_code=500, detail="Failed to start stream")

@router.delete("/sessions/{session_id}")
async def delete_session(
    session_id: str,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Delete a chat session"""
    success = chat_service.clear_session(session_id)
    if not success:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"message": "Session deleted successfully"}

@router.get("/sessions/{session_id}/history")
async def get_conversation_history(
    session_id: str,
    limit: int = 10,
    chat_service: ChatService = Depends(get_chat_service)
):
    """Get conversation history"""
    history = chat_service.get_conversation_history(session_id, limit)
    return {"messages": history}
```

## Step 7: Rate Limiting and Utilities

Create utility functions:

```python
# app/utils/rate_limiter.py
from fastapi import HTTPException, Request
import time
import redis
from app.models.config import settings
from functools import wraps

redis_client = redis.from_url(settings.redis_url)

def rate_limit(max_requests: int, window_seconds: int):
    """Rate limiting decorator"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, request: Request, **kwargs):
            # Get client IP (in production, use proper IP detection)
            client_ip = request.client.host
            
            # Create rate limit key
            key = f"rate_limit:{client_ip}:{func.__name__}"
            
            # Check current requests
            current = redis_client.get(key)
            if current and int(current) >= max_requests:
                raise HTTPException(
                    status_code=429,
                    detail=f"Rate limit exceeded. Maximum {max_requests} requests per {window_seconds} seconds."
                )
            
            # Increment counter
            pipe = redis_client.pipeline()
            pipe.incr(key)
            pipe.expire(key, window_seconds)
            pipe.execute()
            
            return await func(*args, request=request, **kwargs)
        return wrapper
    return decorator
```

```python
# app/utils/logger.py
import structlog
import logging
from app.models.config import settings

def get_logger(name: str):
    """Get structured logger"""
    return structlog.get_logger(name)

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    wrapper_class=structlog.stdlib.BoundLogger,
    cache_logger_on_first_use=True,
)
```

## Step 8: Main Application

Create the main FastAPI application:

```python
# app/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import time
from app.api import chat, health
from app.utils.logger import get_logger

logger = get_logger(__name__)

app = FastAPI(
    title="Gemma 3n Chatbot API",
    description="A production-ready chatbot API powered by Google's Gemma 3n",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]  # Configure properly for production
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    logger.info(
        "Request processed",
        method=request.method,
        url=str(request.url),
        status_code=response.status_code,
        process_time=process_time
    )
    
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(
        "Unhandled exception",
        method=request.method,
        url=str(request.url),
        error=str(exc)
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

# Include routers
app.include_router(health.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {
        "message": "Gemma 3n Chatbot API",
        "version": "1.0.0",
        "docs": "/docs"
    }
```

## Step 9: Health Check Endpoint

```python
# app/api/health.py
from fastapi import APIRouter, Depends
from app.services.chat_service import ChatService
import psutil
import torch

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
async def health_check():
    """Basic health check"""
    return {"status": "healthy"}

@router.get("/detailed")
async def detailed_health_check(chat_service: ChatService = Depends(ChatService)):
    """Detailed health check with system metrics"""
    try:
        # Test model loading
        model_loaded = chat_service.gemma_service.model is not None
        
        # System metrics
        cpu_percent = psutil.cpu_percent()
        memory = psutil.virtual_memory()
        
        # GPU info if available
        gpu_info = {}
        if torch.cuda.is_available():
            gpu_info = {
                "available": True,
                "count": torch.cuda.device_count(),
                "current_device": torch.cuda.current_device(),
                "device_name": torch.cuda.get_device_name()
            }
        
        return {
            "status": "healthy" if model_loaded else "unhealthy",
            "model_loaded": model_loaded,
            "system": {
                "cpu_percent": cpu_percent,
                "memory_percent": memory.percent,
                "memory_available": memory.available // (1024**3),  # GB
                "memory_total": memory.total // (1024**3)  # GB
            },
            "gpu": gpu_info
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
```

## Step 10: Docker Configuration

Create Docker configuration for easy deployment:

```dockerfile
# Dockerfile
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  chatbot:
    build: .
    ports:
      - "8000:8000"
    environment:
      - REDIS_URL=redis://redis:6379
      - MODEL_NAME=google/gemma-3n-4b-it
    depends_on:
      - redis
    volumes:
      - ./models:/app/models
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

## Step 11: Testing the API

Create a simple test script:

```python
# test_chatbot.py
import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_chat_api():
    """Test the chat API"""
    
    # Create a session
    session_response = requests.post(f"{BASE_URL}/chat/sessions")
    session_data = session_response.json()
    session_id = session_data["session_id"]
    
    print(f"Created session: {session_id}")
    
    # Send a message
    message_data = {
        "messages": [
            {
                "role": "user",
                "content": "Hello! Can you explain quantum computing in simple terms?"
            }
        ],
        "stream": False,
        "max_tokens": 200
    }
    
    response = requests.post(
        f"{BASE_URL}/chat/sessions/{session_id}/messages",
        json=message_data
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"Response: {result['message']['content']}")
        print(f"Usage: {result['usage']}")
    else:
        print(f"Error: {response.status_code} - {response.text}")

def test_streaming():
    """Test streaming API"""
    
    # Create a session
    session_response = requests.post(f"{BASE_URL}/chat/sessions")
    session_data = session_response.json()
    session_id = session_data["session_id"]
    
    # Send streaming message
    message_data = {
        "messages": [
            {
                "role": "user",
                "content": "Write a short story about a robot learning to paint."
            }
        ],
        "stream": True,
        "max_tokens": 300
    }
    
    response = requests.post(
        f"{BASE_URL}/chat/sessions/{session_id}/stream",
        json=message_data,
        stream=True
    )
    
    print("Streaming response:")
    for line in response.iter_lines():
        if line:
            data = line.decode('utf-8')
            if data.startswith('data: '):
                try:
                    chunk = json.loads(data[6:])
                    if chunk.get('content'):
                        print(chunk['content'], end='', flush=True)
                    if chunk.get('finish_reason') == 'stop':
                        print("\n--- Stream completed ---")
                        break
                except json.JSONDecodeError:
                    continue

if __name__ == "__main__":
    print("Testing regular chat API...")
    test_chat_api()
    
    print("\n" + "="*50 + "\n")
    
    print("Testing streaming API...")
    test_streaming()
```

## Step 12: Production Deployment

For production deployment, consider these additional configurations:

```python
# production_config.py
import os

# Production settings
PRODUCTION_SETTINGS = {
    "api_host": "0.0.0.0",
    "api_port": int(os.getenv("PORT", 8000)),
    "api_workers": int(os.getenv("WORKERS", 4)),
    "log_level": "WARNING",
    "secret_key": os.getenv("SECRET_KEY"),
    "redis_url": os.getenv("REDIS_URL", "redis://localhost:6379"),
    "rate_limit_per_minute": int(os.getenv("RATE_LIMIT_PER_MINUTE", 30)),
    "rate_limit_per_hour": int(os.getenv("RATE_LIMIT_PER_HOUR", 500)),
}
```

## Conclusion

This comprehensive guide has walked you through building a production-ready chatbot with Gemma 3n and FastAPI. The implementation includes:

- **Robust API Design**: RESTful endpoints with proper error handling
- **Streaming Support**: Real-time response streaming for better UX
- **Session Management**: Persistent chat sessions with Redis
- **Rate Limiting**: Protection against abuse
- **Monitoring**: Health checks and logging
- **Production Ready**: Docker configuration and deployment strategies

The chatbot is now ready for production deployment and can handle real-world traffic while maintaining excellent performance. The modular design makes it easy to extend with additional features like authentication, analytics, or integration with other services.
