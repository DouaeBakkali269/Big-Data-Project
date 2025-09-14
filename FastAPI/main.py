from fastapi import FastAPI

app = FastAPI() # This creates an instance of the FastAPI application

@app.get("/") # This decorator defines a GET endpoint at the root URL
def read_root():
    return {"Hello": "Douae"} 