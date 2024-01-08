# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the contents of the current directory (services) into the container at /app
COPY . .

# Install any needed packages
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000
EXPOSE 8000

CMD ["hypercorn", "app:app", "--reload"]
