import json
from typing import Optional

import numpy as np
from pony import orm

from models.database import db


class BoardState:

    BOARD_SIZE: int = 15

    def __init__(self, initial_state: Optional[np.array] = None) -> None:
        self.__state = initial_state if initial_state else np.zeros((self.BOARD_SIZE, self.BOARD_SIZE))

    @staticmethod
    def deserialize(board_state: str) -> "BoardState":
        raw_state = np.array(json.loads(board_state))
        return BoardState(raw_state)

    def serialize(self) -> str:
        return json.dumps(self.__state.tolist())
