from typing import Dict, List, Union

from pony.orm import commit, db_session, select

from models.board import BoardState
from models.game import Game
from models.round import RoundAction, Round
from models.user import User
import service.gameplay_service as gps


@db_session
def place_word(game: Game, player: Union[User, int], word: str, placed_tiles: List[Dict]):
    board = BoardState.deserialize(game.board)
    for tile_position in placed_tiles:
        board.place_tile(tile_position["x"], tile_position['y'], tile_position['value'])
    game.board = board.serialize()
    current_round = game.current_round_as_round_type()
    score = gps.calculate_word_score(game.id, placed_tiles)
    RoundAction(
        human_player=player if isinstance(player, User) else None,
        ai_player=player if isinstance(player, int) else None,
        round=current_round,
        word=word,
        score_gained=score,
        clicked_pass=False,
    )

    # If this is the last word placed for this round, create another round
    if len(current_round.round_actions) == game.total_player_count():
        Round(
           round_number=current_round.round_number + 1,
           game=game,
        )

    commit()


@db_session
def pass_round(game: Game, player: Union[User, int]):
    current_round = game.current_round()
    RoundAction(
        human_player=player if isinstance(player, User) else None,
        ai_player=player if isinstance(player, int) else None,
        round=current_round,
        word="",
        score_gained=0,
        clicked_pass=True,
    )

    # If this is the last word placed for this round, create another round
    if len(current_round.round_actions) == game.total_player_count():
        Round(
           round_number=current_round.round_number + 1,
           game=game,
        )

    commit()
