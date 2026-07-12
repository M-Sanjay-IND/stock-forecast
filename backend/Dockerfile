# Use the official Python 3.10 slim image
FROM python:3.10-slim

# Set up a new user named "user" with user ID 1000
RUN useradd -m -u 1000 user

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Change ownership of the /app directory to the new user so SQLite can write to it
RUN chown -R user:user /app

# Switch to the "user" user
USER user

# Expose port 7860 (Hugging Face Spaces default)
EXPOSE 7860

# Run the Flask app with Gunicorn
CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:7860", "--workers", "2", "--timeout", "120"]
