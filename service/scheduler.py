import datetime
import os
import random
from sqlite3 import IntegrityError
from time import sleep

from pony.orm import db_session, commit, OptimisticCheckError

from AI.AIWordPlacer import AIWordPlacer
from models.board import BoardState
from models.database import db
from models.game import Game
from models.tile_bag import Rack
from service.ai_lock import ai_lock
from service.word_service import place_word


@db_session
def ai_play_word_decision():
    print(f"AI is making a decision at {datetime.datetime.now()} in process {os.getpid()}")
    try:
        games = Game.select().filter(lambda game: game.is_ready())[:]
        for game in games:
            ai_round_actions = (
                game.current_round()
                    .round_actions
                    .filter(lambda round_action: round_action.is_ai() is True)
                [:]
            )
            if len(ai_round_actions) < game.ai_player_count:
                played_ais = {round_action.ai_player for round_action in ai_round_actions}
                for ai_number in range(1, game.ai_player_count + 1):
                    if ai_number not in played_ais:
                        try:
                            print(f"AI #{ai_number} has not played yet for game #{game.id}")
                            ai_rack = Rack.select().filter(lambda rack: rack.game == game and rack.ai_player == ai_number).first()
                            word_tiles = AIWordPlacer(ai_rack.tiles).place_word(BoardState.deserialize(game.board).state)
                            word = ','.join([tile['value'] for tile in word_tiles])
                            place_word(game=game, player=ai_number, word=word, placed_tiles=word_tiles)
                            commit()
                        except IntegrityError:
                            pass
                    else:
                        print(f"AI #{ai_number} has already played for game #{game.id}")
    except OptimisticCheckError:
        print("Encountered race condition, checking again later")
        # This process lost the race to place a word, skip the turn
        pass


def ai_scheduler():
    if os.name == 'nt':
        # Only need to do this on Windows
        db.generate_mapping(create_tables=False)

    sleep(10)
    while True:
        with ai_lock:
            ai_play_word_decision()
            sleep(random.randint(30, 120))

