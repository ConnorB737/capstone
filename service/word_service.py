from typing import Dict, List, Union

from pony.orm import commit, db_session, select

from models.board import BoardState
from models.game import Game
from models.score import Score
from models.user import User
import service.gameplay_service as gps


@db_session
def place_word(game: Game, player: Union[User, int], placed_tiles: List[Dict]):
    board = BoardState.deserialize(game.board)
    for tile_position in placed_tiles:
        board.place_tile(tile_position["x"], tile_position['y'], tile_position['value'])
    game.board = board.serialize()
    score_obj = select(score for score in Score).filter(lambda s: s.game == game).filter(lambda s: s.user == player).first()
    score = gps.calculate_word_score(game.id, placed_tiles)
    score_obj.value += score
    commit()
