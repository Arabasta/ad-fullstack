import os

from dotenv import load_dotenv
from fastapi.testclient import TestClient
from main import app

load_dotenv()
BACK_FASTAPI_URL = os.getenv('BACK_FASTAPI_URL')

client = TestClient(app, base_url=BACK_FASTAPI_URL)


def test_redirect_to_documentation():
    response = client.get("/")
    assert response.status_code == 200
    assert response.url.path.endswith("/documentation")

# todo: alvin: add test cases
