import pytest

from models.game import Game
from service.game_service import build_game


@pytest.mark.pony
def test_build_game(ponydb):
    user = ponydb.User(login="user", password="password")
    human_player_count = 3
    ai_player_count = 1
    game = build_game(user, human_player_count=human_player_count, ai_player_count=ai_player_count)

    # Returned a Game
    assert isinstance(game, Game)

    # User already added to players
    assert user in game.human_players

    # Tile bag built
    tile_bag = ponydb.TileBag.select(lambda t: t.game == game)
    assert len(tile_bag) == 1

    # Test racks built
    racks = ponydb.Rack.select(lambda s: s.game == game)
    assert len(racks) == 1 + ai_player_count

    # Test round not built yet
    rounds = ponydb.Round.select(lambda r: r.game == game)
    assert len(rounds) == 0

