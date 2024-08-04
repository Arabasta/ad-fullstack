from decimal import Decimal
from typing import List

from pydantic import BaseModel, ConfigDict

from . import TickerDTO


class PredictionDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    tickerDTO: TickerDTO
    predictions: List[Decimal]
