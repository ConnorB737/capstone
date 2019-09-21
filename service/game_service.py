from pony.orm import commit

from models.board import BoardState
from models.game import Game
from models.score import Score
from models.turn_state import TurnState
from models.user import User

FIRST_ROUND: int = 1


class GameError(RuntimeError):
    pass


def build_game(first_player: User) -> Game:
    new_game = Game(
        players={first_player},
        board=BoardState().serialize(),
        round=FIRST_ROUND,
    )
    TurnState(
        game=new_game,
        player=first_player,
        has_placed=False,
    )
    Score(
        game=new_game,
        user=first_player,
        value=0,
    )
    commit()
    return new_game


def join_existing_game(game_id: int, player: User) -> Game:
    game = Game.get(id=game_id)
    if game is None:
        raise GameError(f"Could not find game with id: {game_id}")

    if game.has_player(player):
        return game
    elif len(game.players) < 2:
        game.players.add(player)
        TurnState(
            game=game,
            player=player,
            has_placed=False,
        )
        Score(
            game=game,
            user=player,
            value=0,
        )
        commit()
        return game
    else:
        raise GameError(f"No room to join game with id: {game_id}")
