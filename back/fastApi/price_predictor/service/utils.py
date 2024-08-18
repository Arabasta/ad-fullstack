import json
import os
from pathlib import Path

import numpy as np


def get_project_root() -> Path:
    return Path(__file__).parent.parent


def get_repo_root() -> Path:
    return Path(__file__).parent.parent.parent.parent.parent


def get_files_with_paths(directory, file_extension):
    file_paths = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(f"{file_extension}"):  # e.g. '.pkl' files
                full_path = os.path.join(root, file)
                file_paths[file] = full_path
    return file_paths


# ref: https://stackoverflow.com/a/47626762/23332444
class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)
