# Misinformation Guard

A full-stack application for detecting misinformation and deepfakes. This project utilizes an LLM (Phi-3 via Ollama) and custom deep learning models for reasoning and media detection.

## Project Structure

- `/frontend`: Next.js frontend application.
- `/backend`: FastAPI Python backend for serving predictions and processing data.
- `/models`: Machine learning models, weights (`.safetensors`, `.pt`), and Jupyter notebooks for training (Deepfake detector, etc.). *Note: Large model weights are ignored in source control and should be downloaded separately.*

## Prerequisites

- **Python 3.8+**
- **Node.js & npm**
- **[Ollama](https://ollama.com/)** (for running the local Phi-3 model)

## Getting Started

### 1. Backend

Use the provided `start.bat` script to automatically pull the required Phi-3 model via Ollama, install Python dependencies, and run the Python FastAPI backend server:

```bash
.\start.bat
```

The backend server will run at `http://localhost:8000`.

### 2. Frontend

Open a new terminal, navigate to the frontend directory, install dependencies, and start the Next.js development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at `http://localhost:3000`.