from pony import orm

from models.database import db


class TurnState(db.Entity):
    game = orm.Required('Game', reverse="turn_state")
    player = orm.Required('User', reverse="turn_states")
    has_placed = orm.Required(bool)
