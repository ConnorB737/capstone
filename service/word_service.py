from typing import Dict, List, Union

from pony.orm import commit, db_session, select

from models.board import BoardState
from models.game import Game
from models.round import PlacedWord, Round
from models.user import User
import service.gameplay_service as gps
import AI.AIWordPlacer


@db_session
def place_word(game: Game, player: Union[User, int], placed_tiles: List[Dict]):
    board = BoardState.deserialize(game.board)
    for tile_position in placed_tiles:
        board.place_tile(tile_position["x"], tile_position['y'], tile_position['value'])
    game.board = board.serialize()
    current_round = game.current_round()
    score = gps.calculate_word_score(game.id, placed_tiles)
    PlacedWord(
        human_player=player if isinstance(player, User) else None,
        ai_player=player if isinstance(player, int) else None,
        round=current_round,
        word=''.join([tile['value'] for tile in placed_tiles]),
        score_gained=score,
    )

    # If this is the last word placed for this round, create another round
    if len(current_round.placed_words) == game.total_ai_count():
        Round(
           round_number=current_round.round_number + 1,
           game=game,
        )

    commit()
