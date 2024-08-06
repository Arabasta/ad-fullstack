from typing import List

from pydantic import BaseModel, ConfigDict

from . import TickerDTO


class TickerDTOListDTO(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    tickerDTOList: List[TickerDTO]
