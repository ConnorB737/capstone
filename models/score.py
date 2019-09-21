from pony import orm

from models.database import db
from models.user import User


class Score(db.Entity):
    game = orm.Required("Game", reverse="scores")
    user = orm.Required(User, reverse="scores")
    value = orm.Required(int)
