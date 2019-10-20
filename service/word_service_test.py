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
    word = ''.join([t["value"] for t in tile_positions])
    place_word(game, user, word, tile_positions)

    current_round = game.current_round()
    round_actions = current_round.round_actions
    assert len(round_actions) == 1

    round_action = round_actions.select().first()
    assert round_action.human_player == user
    assert round_action.word == word
    assert round_action.score_gained == 14

    scores = build_scores(game)
    assert scores[user.login] == 14
