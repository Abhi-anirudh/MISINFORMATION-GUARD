@echo off
echo Starting Misinformation Guard locally...
set USE_LOCAL_LLM=true
cd backend
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload