FROM python:3.10-slim

WORKDIR /app

# Set the huggingface cache directory to /tmp to avoid permission issues
ENV HF_HOME=/tmp/huggingface

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download model at build time to save startup time
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Copy the rest of the files
COPY . .

# HuggingFace Spaces exposes port 7860 by default
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
