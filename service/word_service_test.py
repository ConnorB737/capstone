import pytest
from pony.orm import select

from service.game_service import build_game, join_existing_game
from service.word_service import place_word, build_scores


@pytest.mark.pony
def test_place_word(ponydb):
    # The user placing the word
    user = ponydb.User(login="user", password="password")
    game = build_game(user, ai_player_count=1, human_player_count=3)

    # Other users
    other_user_1 = ponydb.User(login="other_user_1", password="password")
    other_user_2 = ponydb.User(login="other_user_2", password="password")

    join_existing_game(game, other_user_1)
    join_existing_game(game, other_user_2)

    # Check that the game is ready to play
    rounds = ponydb.Round.select(lambda r: r.game == game)
    assert len(rounds) == 1

    rack = game.racks.select(lambda r: r.human_player == user).first()
    tiles_before = list(rack.tiles)

    tile_positions = [
        {
            "x": 1,
            "y": 1,
            "value": rack.tiles[0],
        },
        {
            "x": 2,
            "y": 1,
            "value": rack.tiles[1],
        },
        {
            "x": 3,
            "y": 1,
            "value": rack.tiles[2],
        },
    ]
    word = ''.join([t["value"] for t in tile_positions])
    place_word(game, user, word, tile_positions)

    current_round = game.current_round()
    round_actions = current_round.round_actions
    assert len(round_actions) == 1

    round_action = round_actions.select().first()
    assert round_action.human_player == user
    assert round_action.word == word

    scores = build_scores(game)
    assert scores[user.login] > 0

    rack = game.racks.select(lambda r: r.human_player == user).first()
    tiles_after = list(rack.tiles)
    assert tiles_before != tiles_after
