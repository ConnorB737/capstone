from pony import orm

from models.database import db
from models.mixins import HasPlayer


class TurnState(db.Entity, HasPlayer):
    game = orm.Required('Game', reverse="turn_state")
    human_player = orm.Optional("User", reverse="turn_states")
    # The index of AI player for the game
    ai_player = orm.Optional(int)
    has_placed = orm.Required(bool)

