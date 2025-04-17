from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import uvicorn

app = FastAPI()

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/api")
async def root():
    return {"message": "Welcome to the Pytincture Website API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
