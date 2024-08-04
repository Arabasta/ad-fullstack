import json
from pathlib import Path

import numpy as np


def get_project_root() -> Path:
    return Path(__file__).parent.parent


def get_repo_root() -> Path:
    return Path(__file__).parent.parent.parent.parent.parent


# ref: https://stackoverflow.com/a/47626762/23332444
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)
