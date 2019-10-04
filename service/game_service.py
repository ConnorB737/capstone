from typing import Union

from pony.orm import commit

from models.board import BoardState
from models.game import Game
from models.score import Score
from models.tile_bag import TileBag, Rack
from models.history import History
from models.turn_state import TurnState
from models.user import User

FIRST_ROUND: int = 1


def build_game(first_player: User, human_player_count: int, ai_player_count: int) -> Game:
    tile_bag = TileBag.build_bag()
    words_history = History.build_history()
    new_game = Game(
        human_players={first_player},
        human_player_count=human_player_count,
        ai_player_count=ai_player_count,
        board=BoardState().serialize(),
        round=FIRST_ROUND,
        tile_bag=tile_bag,
        words_history = words_history,
    )
    tile_bag.game = new_game
    commit()
    join_existing_game(new_game, first_player)
    for ai_player_index in range(1, ai_player_count + 1):
        join_existing_game(new_game, ai_player_index)
    return new_game


def join_existing_game(game: Game, player: Union[User, int]) -> Game:
    player_config = None
    if isinstance(player, User):
        if game.has_human_player(player):
            return game

        elif len(game.human_players) < game.human_player_count:
            game.human_players.add(player)
            player_config = dict(
                human_player=player,
                ai_player=None,
            )
    else:
        player_config = dict(
            human_player=None,
            ai_player=player,
        )

    TurnState(
        game=game,
        has_placed=False,
        **player_config,
    )
    Rack(
        game=game,
        tiles=game.tile_bag.fill_rack(),
        **player_config,
    )
    Score(
        game=game,
        value=0,
        **player_config,
    )
    commit()
    return game
