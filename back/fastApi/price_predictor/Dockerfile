FROM python:3.9-slim
WORKDIR /app
COPY price_predictor/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY price_predictor /app
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
