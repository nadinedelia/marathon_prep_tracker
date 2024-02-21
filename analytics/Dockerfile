FROM python:3.9.7-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5050

ENV FLASK_APP=app:create_app()

CMD ["gunicorn", "--bind", "0.0.0.0:5050", "app:create_app()"]
