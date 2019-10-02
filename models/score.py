from pony import orm

from models.database import db
from models.mixins import HasPlayer


class Score(db.Entity, HasPlayer):
    game = orm.Required("Game", reverse="scores")
    human_player = orm.Optional("User", reverse="scores")
    # The index of AI player for the game
    ai_player = orm.Optional(int)
    value = orm.Required(int)
