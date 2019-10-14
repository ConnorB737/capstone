import pytest
from pony.orm import select

from service.game_service import build_game
from service.word_service import place_word


@pytest.mark.pony
def test_place_word(ponydb):
    user = ponydb.User(login="user", password="password")
    game = build_game(user)
    tile_positions = [
        {
            "x": 1,
            "y": 1,
            "value": "A",
        },
        {
            "x": 2,
            "y": 1,
            "value": "D",
        },
        {
            "x": 3,
            "y": 1,
            "value": "D",
        },
    ]
    place_word(game.id, user, tile_positions)

    score = select(score for score in ponydb.Score).filter(lambda s: s.game == game).filter(lambda s: s.user == user).first()
    assert score.value == 14
