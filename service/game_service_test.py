import pytest

from models.game import Game
from service.game_service import build_game


@pytest.mark.pony
def test_build_game(ponydb):
    user = ponydb.User(login="user", password="password")
    game = build_game(user)
    assert isinstance(game, Game)
    assert user in game.human_players

    scores = ponydb.Score.select(lambda s: s.game == game)
    assert len(scores) == 1
