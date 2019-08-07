from uuid import uuid4

from pony.orm import commit

from models.board import BoardState
from models.game import Game


FIRST_ROUND: int = 1


def build_game() -> Game:
    new_game = Game(
        first_player_url=str(uuid4()),
        second_player_url=str(uuid4()),
        board=BoardState().serialize(),
        round=FIRST_ROUND,
        has_first_player_placed=False,
        has_second_player_placed=False,
    )
    commit()
    return new_game
