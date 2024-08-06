from typing import List

from pydantic import BaseModel, ConfigDict

from . import PredictionDTO


class PredictionDTOListDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    predictionDTOList: List[PredictionDTO]
