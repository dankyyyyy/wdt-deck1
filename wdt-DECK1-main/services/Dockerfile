# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the current directory (services) into the container at /app
COPY . .

# Install packages
RUN pip install --no-cache-dir -r requirements.txt

# Non-root User
RUN useradd -m serviceuser
USER serviceuser

ENV LOG_LEVEL=INFO

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["hypercorn", "app:app", "--bind", "0.0.0.0:8000"]
