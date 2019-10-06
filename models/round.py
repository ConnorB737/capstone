import datetime

from pony import orm
from models.database import db
from models.mixins import HasPlayer


class Round(db.Entity):
    game = orm.Optional("Game", reverse="rounds")
    # The current round of the game, indexed from 1
    round_number = orm.Required(int)
    placed_words = orm.Set("PlacedWord", reverse="round")


class PlacedWord(db.Entity, HasPlayer):
    round = orm.Optional(Round, reverse="placed_words")
    human_player = orm.Optional("User", reverse="placed_words")
    # The index of AI player for the game
    ai_player = orm.Optional(int)
    word = orm.Required(str)
    score_gained = orm.Required(int)
    placed_at = orm.Required(datetime.datetime, sql_default='CURRENT_TIMESTAMP')
