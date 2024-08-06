from pydantic import BaseModel, ConfigDict


class TickerDTO(BaseModel):
    tickerType: str = 'None'
    tickerName: str = 'None'
