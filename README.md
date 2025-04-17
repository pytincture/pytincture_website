# Pytincture Website

A Python/FastAPI-based website configured for deployment on Fly.io.

## Setup

1. Install Python 3.12+ and pip
2. Clone this repository
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/Linux/Mac: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Run locally: `python main.py`

## Deploy to Fly.io

1. Install Flyctl: `curl -L https://fly.io/install.sh | sh`
2. Sign up/login: `flyctl auth signup` or `flyctl auth login`
3. Update `fly.toml` with your unique app name
4. Deploy: `flyctl deploy`

## Project Structure

- `main.py`: FastAPI application serving API and static files
- `static/`: Static assets
  - `index.html`: Main page
  - `css/styles.css`: Styles
  - `js/main.js`: Client-side JavaScript
- `fly.toml`: Fly.io configuration
- `Dockerfile`: Docker configuration for deployment
- `requirements.txt`: Python dependencies

## Testing

- Access the homepage at `/`
- Test the API at `/api`
- API docs available at `/docs`
