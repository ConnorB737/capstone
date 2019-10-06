from typing import Union

from pony.orm import commit

from models.board import BoardState
from models.game import Game
from models.tile_bag import TileBag, Rack
from models.round import Round
from models.user import User

FIRST_ROUND: int = 1


def build_game(first_player: User, human_player_count: int, ai_player_count: int) -> Game:
    tile_bag = TileBag.build_bag()
    new_game = Game(
        human_players={first_player},
        human_player_count=human_player_count,
        ai_player_count=ai_player_count,
        board=BoardState().serialize(),
        tile_bag=tile_bag,
        has_finished=False,
    )
    tile_bag.game = new_game
    commit()
    join_existing_game(new_game, first_player)
    for ai_player_index in range(1, ai_player_count + 1):
        join_existing_game(new_game, ai_player_index)
    if new_game.is_ready():
        Round(
            game=new_game,
            round_number=1,
        )
        commit()
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
            if game.is_ready():
                Round(
                    game=game,
                    round_number=1,
                )
    else:
        player_config = dict(
            human_player=None,
            ai_player=player,
        )

    Rack(
        game=game,
        tiles=game.tile_bag.fill_rack(),
        **player_config,
    )
    commit()
    return game
