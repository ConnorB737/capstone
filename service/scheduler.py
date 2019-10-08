import datetime
import os
from sqlite3 import IntegrityError

from pony.orm import db_session, commit
from apscheduler.schedulers.blocking import BlockingScheduler

from models.game import Game


@db_session
def ai_play_word_decision():
    print(f"AI is making a decision at {datetime.datetime.now()} in process {os.getpid()}")
    games = Game.select().filter(lambda game: game.is_ready())[:]
    for game in games:
        ai_round_actions = game.current_round().round_actions.filter(lambda round_action: round_action.is_ai() == True)[
                           :]
        if len(ai_round_actions) < game.ai_player_count:
            played_ais = {round_action.ai_player for round_action in ai_round_actions}
            for ai_number in range(1, game.ai_player_count + 1):
                if ai_number not in played_ais:
                    try:
                        print(f"AI #{ai_number} has not played yet for game #{game.id}")
                        # Insert place word here
                        commit()
                    except IntegrityError:
                        pass


def ai_scheduler():

    # This is used to mimic the AI making decisions and playing words.
    scheduler = BlockingScheduler()
    scheduler_pid = os.getpid()

    scheduler.add_job(
        func=ai_play_word_decision,
        trigger="interval",
        id="ai_make_decisions",
        seconds=2,
        replace_existing=True,
    )

    print(f"Scheduler started on process {scheduler_pid}!")
    scheduler.start()

