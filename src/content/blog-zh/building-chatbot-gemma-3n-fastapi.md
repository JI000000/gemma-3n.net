---
title: "使用Gemma 3n和FastAPI构建聊天机器人：完整生产指南"
title_en: "Building a Chatbot with Gemma 3n and FastAPI: Complete Production Guide"
description: "学习如何使用Gemma 3n和FastAPI构建生产就绪的聊天机器人。本全面指南涵盖API设计、流式响应、错误处理和部署策略。"
description_en: "Learn how to build a production-ready chatbot using Gemma 3n and FastAPI. This comprehensive guide covers API design, streaming responses, error handling, and deployment strategies."
pubDate: 2025-07-19
lastUpdated: 2025-07-19
author: "The Gemma-3n.net Team"
tags: ["Gemma 3n", "FastAPI", "聊天机器人", "API", "流式响应", "生产部署", "教程", "Python"]
draft: false
lang: "zh"
---

使用Gemma 3n和FastAPI构建聊天机器人是部署AI模型最实用的方法之一。这个全面指南将带你创建一个健壮、可扩展的聊天机器人，能够处理真实世界的流量，同时保持出色的性能。

无论你是在构建客户服务机器人、编程助手还是创意写作伙伴，本教程都提供了从概念到生产部署所需的一切。

## 为什么选择Gemma 3n + FastAPI？

Gemma 3n和FastAPI的组合提供了几个优势：

- **效率**：Gemma 3n的优化架构在消费级硬件上运行流畅
- **速度**：FastAPI的异步功能提供出色的性能
- **可扩展性**：易于从开发扩展到生产
- **开发者体验**：FastAPI的自动文档和类型检查
- **实时性**：内置流式响应支持

## 项目结构

让我们从设置项目结构开始：

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

## 步骤1：环境设置

首先，创建我们的requirements文件：

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

安装依赖：

```bash
pip install -r requirements.txt
```

## 步骤2：配置管理

创建我们的配置系统：

```python
# app/models/config.py
from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # 模型配置
    model_name: str = "google/gemma-3n-4b-it"
    model_device: str = "auto"
    max_tokens: int = 512
    temperature: float = 0.7
    top_p: float = 0.9
    top_k: int = 40
    
    # API配置
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_workers: int = 1
    
    # 安全
    secret_key: str = "your-secret-key-here"
    access_token_expire_minutes: int = 30
    
    # 速率限制
    rate_limit_per_minute: int = 60
    rate_limit_per_hour: int = 1000
    
    # Redis配置
    redis_url: str = "redis://localhost:6379"
    
    # 日志
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

## 步骤3：聊天模型和模式

定义我们的数据模型：

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

## 步骤4：Gemma服务实现

创建核心AI服务：

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
        """加载和配置Gemma 3n模型"""
        try:
            logger.info(f"正在加载模型: {settings.model_name}")
            
            # 配置量化以提高内存效率
            bnb_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_quant_type="nf4",
                bnb_4bit_compute_dtype=torch.float16,
                bnb_4bit_use_double_quant=True,
            )
            
            # 加载模型并优化
            self.model = AutoModelForCausalLM.from_pretrained(
                settings.model_name,
                quantization_config=bnb_config,
                device_map=settings.model_device,
                torch_dtype=torch.float16,
                attn_implementation="flash_attention_2"
            )
            
            # 加载分词器
            self.tokenizer = AutoTokenizer.from_pretrained(settings.model_name)
            self.tokenizer.pad_token = self.tokenizer.eos_token
            
            logger.info("模型加载成功")
            
        except Exception as e:
            logger.error(f"加载模型失败: {e}")
            raise
    
    def _format_messages(self, messages: List[Message]) -> str:
        """将消息列表转换为提示字符串"""
        formatted = ""
        for message in messages:
            if message.role == MessageRole.SYSTEM:
                formatted += f"系统: {message.content}\n\n"
            elif message.role == MessageRole.USER:
                formatted += f"用户: {message.content}\n\n"
            elif message.role == MessageRole.ASSISTANT:
                formatted += f"助手: {message.content}\n\n"
        
        formatted += "助手: "
        return formatted
    
    def _get_generation_params(self, request: ChatRequest) -> Dict[str, Any]:
        """从请求或默认值获取生成参数"""
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
        """生成单个响应"""
        try:
            # 格式化对话
            prompt = self._format_messages(request.messages)
            
            # 标记化输入
            inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
            
            # 获取生成参数
            gen_params = self._get_generation_params(request)
            
            # 生成响应
            with torch.no_grad():
                outputs = self.model.generate(
                    **inputs,
                    **gen_params
                )
            
            # 解码响应
            response_text = self.tokenizer.decode(
                outputs[0][inputs['input_ids'].shape[1]:], 
                skip_special_tokens=True
            )
            
            # 计算使用量
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
            logger.error(f"生成响应时出错: {e}")
            raise
    
    def generate_stream(self, request: ChatRequest) -> Generator[Dict[str, Any], None, None]:
        """生成流式响应"""
        try:
            # 格式化对话
            prompt = self._format_messages(request.messages)
            
            # 标记化输入
            inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
            
            # 获取生成参数
            gen_params = self._get_generation_params(request)
            
            # 流式生成
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
                    # 解码新标记
                    new_tokens = outputs.sequences[0][inputs['input_ids'].shape[1]:]
                    new_text = self.tokenizer.decode(new_tokens, skip_special_tokens=True)
                    
                    # 产生新内容
                    if new_text:
                        generated_text += new_text
                        yield {
                            "content": new_text,
                            "finish_reason": None,
                            "usage": None
                        }
            
            # 计算最终使用量
            input_tokens = inputs['input_ids'].shape[1]
            output_tokens = len(self.tokenizer.encode(generated_text))
            total_tokens = input_tokens + output_tokens
            
            usage = {
                "prompt_tokens": input_tokens,
                "completion_tokens": output_tokens,
                "total_tokens": total_tokens
            }
            
            # 产生最终消息
            yield {
                "content": "",
                "finish_reason": "stop",
                "usage": usage
            }
            
        except Exception as e:
            logger.error(f"流式生成时出错: {e}")
            yield {
                "content": "",
                "finish_reason": "error",
                "usage": None
            }
```

## 步骤5：聊天服务实现

创建聊天管理服务：

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
        """创建新的聊天会话"""
        session_id = str(uuid.uuid4())
        session = ChatSession(
            session_id=session_id,
            messages=[],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
            metadata=metadata or {}
        )
        
        # 存储在Redis中
        self.redis_client.setex(
            f"session:{session_id}",
            3600,  # 1小时TTL
            session.model_dump_json()
        )
        
        return session
    
    def get_session(self, session_id: str) -> Optional[ChatSession]:
        """检索聊天会话"""
        try:
            session_data = self.redis_client.get(f"session:{session_id}")
            if session_data:
                return ChatSession.model_validate_json(session_data)
        except Exception as e:
            logger.error(f"检索会话 {session_id} 时出错: {e}")
        
        return None
    
    def add_message(self, session_id: str, message: Message) -> bool:
        """向会话添加消息"""
        try:
            session = self.get_session(session_id)
            if not session:
                return False
            
            session.messages.append(message)
            session.updated_at = datetime.utcnow()
            
            # 更新Redis
            self.redis_client.setex(
                f"session:{session_id}",
                3600,
                session.model_dump_json()
            )
            
            return True
        except Exception as e:
            logger.error(f"向会话 {session_id} 添加消息时出错: {e}")
            return False
    
    def get_conversation_history(self, session_id: str, limit: int = 10) -> List[Message]:
        """获取最近的对话历史"""
        session = self.get_session(session_id)
        if not session:
            return []
        
        return session.messages[-limit:]
    
    def clear_session(self, session_id: str) -> bool:
        """清除聊天会话"""
        try:
            self.redis_client.delete(f"session:{session_id}")
            return True
        except Exception as e:
            logger.error(f"清除会话 {session_id} 时出错: {e}")
            return False
```

## 步骤6：API端点

创建FastAPI端点：

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

# 依赖注入
def get_chat_service() -> ChatService:
    return ChatService()

@router.post("/sessions", response_model=ChatSession)
async def create_chat_session(
    metadata: dict = None,
    chat_service: ChatService = Depends(get_chat_service)
):
    """创建新的聊天会话"""
    try:
        session = chat_service.create_session(
            user_id="anonymous",  # 在生产环境中，从认证获取
            metadata=metadata or {}
        )
        return session
    except Exception as e:
        logger.error(f"创建会话时出错: {e}")
        raise HTTPException(status_code=500, detail="创建会话失败")

@router.get("/sessions/{session_id}", response_model=ChatSession)
async def get_chat_session(
    session_id: str,
    chat_service: ChatService = Depends(get_chat_service)
):
    """获取聊天会话"""
    session = chat_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="会话未找到")
    return session

@router.post("/sessions/{session_id}/messages", response_model=ChatResponse)
@rate_limit(max_requests=60, window_seconds=60)
async def send_message(
    session_id: str,
    request: ChatRequest,
    background_tasks: BackgroundTasks,
    chat_service: ChatService = Depends(get_chat_service)
):
    """发送消息并获取响应"""
    try:
        # 验证会话存在
        session = chat_service.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="会话未找到")
        
        # 向会话添加用户消息
        if request.messages:
            last_message = request.messages[-1]
            chat_service.add_message(session_id, last_message)
        
        # 生成响应
        if request.stream:
            raise HTTPException(status_code=400, detail="使用/stream端点进行流式传输")
        
        response_data = chat_service.gemma_service.generate_response(request)
        
        # 创建助手消息
        assistant_message = Message(
            role=MessageRole.ASSISTANT,
            content=response_data["content"]
        )
        
        # 添加到会话
        chat_service.add_message(session_id, assistant_message)
        
        return ChatResponse(
            message=assistant_message,
            usage=response_data["usage"],
            finish_reason=response_data["finish_reason"]
        )
        
    except Exception as e:
        logger.error(f"处理消息时出错: {e}")
        raise HTTPException(status_code=500, detail="处理消息失败")

@router.post("/sessions/{session_id}/stream")
@rate_limit(max_requests=60, window_seconds=60)
async def stream_message(
    session_id: str,
    request: ChatRequest,
    chat_service: ChatService = Depends(get_chat_service)
):
    """流式消息响应"""
    try:
        # 验证会话存在
        session = chat_service.get_session(session_id)
        if not session:
            raise HTTPException(status_code=404, detail="会话未找到")
        
        # 向会话添加用户消息
        if request.messages:
            last_message = request.messages[-1]
            chat_service.add_message(session_id, last_message)
        
        def generate_stream():
            try:
                for chunk in chat_service.gemma_service.generate_stream(request):
                    yield f"data: {json.dumps(chunk)}\n\n"
                
                # 向会话添加最终助手消息
                if chunk and chunk.get("content"):
                    assistant_message = Message(
                        role=MessageRole.ASSISTANT,
                        content=chunk["content"]
                    )
                    chat_service.add_message(session_id, assistant_message)
                    
            except Exception as e:
                logger.error(f"流式生成时出错: {e}")
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
        logger.error(f"流式端点出错: {e}")
        raise HTTPException(status_code=500, detail="启动流失败")

@router.delete("/sessions/{session_id}")
async def delete_session(
    session_id: str,
    chat_service: ChatService = Depends(get_chat_service)
):
    """删除聊天会话"""
    success = chat_service.clear_session(session_id)
    if not success:
        raise HTTPException(status_code=404, detail="会话未找到")
    return {"message": "会话删除成功"}

@router.get("/sessions/{session_id}/history")
async def get_conversation_history(
    session_id: str,
    limit: int = 10,
    chat_service: ChatService = Depends(get_chat_service)
):
    """获取对话历史"""
    history = chat_service.get_conversation_history(session_id, limit)
    return {"messages": history}
```

## 步骤7：速率限制和工具

创建工具函数：

```python
# app/utils/rate_limiter.py
from fastapi import HTTPException, Request
import time
import redis
from app.models.config import settings
from functools import wraps

redis_client = redis.from_url(settings.redis_url)

def rate_limit(max_requests: int, window_seconds: int):
    """速率限制装饰器"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, request: Request, **kwargs):
            # 获取客户端IP（在生产环境中，使用适当的IP检测）
            client_ip = request.client.host
            
            # 创建速率限制键
            key = f"rate_limit:{client_ip}:{func.__name__}"
            
            # 检查当前请求
            current = redis_client.get(key)
            if current and int(current) >= max_requests:
                raise HTTPException(
                    status_code=429,
                    detail=f"超出速率限制。每{window_seconds}秒最多{max_requests}个请求。"
                )
            
            # 增加计数器
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
    """获取结构化日志记录器"""
    return structlog.get_logger(name)

# 配置结构化日志
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

## 步骤8：主应用程序

创建主FastAPI应用程序：

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
    title="Gemma 3n聊天机器人API",
    description="由Google的Gemma 3n驱动的生产就绪聊天机器人API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中正确配置
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]  # 在生产环境中正确配置
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
        "请求已处理",
        method=request.method,
        url=str(request.url),
        status_code=response.status_code,
        process_time=process_time
    )
    
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(
        "未处理的异常",
        method=request.method,
        url=str(request.url),
        error=str(exc)
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "内部服务器错误"}
    )

# 包含路由器
app.include_router(health.router)
app.include_router(chat.router)

@app.get("/")
async def root():
    return {
        "message": "Gemma 3n聊天机器人API",
        "version": "1.0.0",
        "docs": "/docs"
    }
```

## 步骤9：健康检查端点

```python
# app/api/health.py
from fastapi import APIRouter, Depends
from app.services.chat_service import ChatService
import psutil
import torch

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
async def health_check():
    """基本健康检查"""
    return {"status": "healthy"}

@router.get("/detailed")
async def detailed_health_check(chat_service: ChatService = Depends(ChatService)):
    """详细的健康检查，包含系统指标"""
    try:
        # 测试模型加载
        model_loaded = chat_service.gemma_service.model is not None
        
        # 系统指标
        cpu_percent = psutil.cpu_percent()
        memory = psutil.virtual_memory()
        
        # GPU信息（如果可用）
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

## 步骤10：Docker配置

创建Docker配置以便轻松部署：

```dockerfile
# Dockerfile
FROM python:3.11-slim

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /app

# 复制requirements并安装Python依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用程序代码
COPY app/ ./app/

# 创建非root用户
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# 暴露端口
EXPOSE 8000

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# 运行应用程序
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

## 步骤11：测试API

创建简单的测试脚本：

```python
# test_chatbot.py
import requests
import json
import time

BASE_URL = "http://localhost:8000"

def test_chat_api():
    """测试聊天API"""
    
    # 创建会话
    session_response = requests.post(f"{BASE_URL}/chat/sessions")
    session_data = session_response.json()
    session_id = session_data["session_id"]
    
    print(f"创建会话: {session_id}")
    
    # 发送消息
    message_data = {
        "messages": [
            {
                "role": "user",
                "content": "你好！你能用简单的话解释量子计算吗？"
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
        print(f"响应: {result['message']['content']}")
        print(f"使用量: {result['usage']}")
    else:
        print(f"错误: {response.status_code} - {response.text}")

def test_streaming():
    """测试流式API"""
    
    # 创建会话
    session_response = requests.post(f"{BASE_URL}/chat/sessions")
    session_data = session_response.json()
    session_id = session_data["session_id"]
    
    # 发送流式消息
    message_data = {
        "messages": [
            {
                "role": "user",
                "content": "写一个关于机器人学习绘画的短故事。"
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
    
    print("流式响应:")
    for line in response.iter_lines():
        if line:
            data = line.decode('utf-8')
            if data.startswith('data: '):
                try:
                    chunk = json.loads(data[6:])
                    if chunk.get('content'):
                        print(chunk['content'], end='', flush=True)
                    if chunk.get('finish_reason') == 'stop':
                        print("\n--- 流完成 ---")
                        break
                except json.JSONDecodeError:
                    continue

if __name__ == "__main__":
    print("测试常规聊天API...")
    test_chat_api()
    
    print("\n" + "="*50 + "\n")
    
    print("测试流式API...")
    test_streaming()
```

## 步骤12：生产部署

对于生产部署，考虑这些额外的配置：

```python
# production_config.py
import os

# 生产设置
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

## 结论

这个全面指南已经带你完成了使用Gemma 3n和FastAPI构建生产就绪聊天机器人的过程。实现包括：

- **健壮的API设计**：具有适当错误处理的RESTful端点
- **流式支持**：实时响应流式传输，提供更好的用户体验
- **会话管理**：使用Redis的持久聊天会话
- **速率限制**：防止滥用的保护
- **监控**：健康检查和日志记录
- **生产就绪**：Docker配置和部署策略

聊天机器人现在已经准备好进行生产部署，可以处理真实世界的流量，同时保持出色的性能。模块化设计使得添加身份验证、分析或与其他服务的集成等附加功能变得容易。
