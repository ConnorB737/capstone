from pony import orm

from models.database import db
from models.turn_state import TurnState
from models.user import User


class Game(db.Entity):
    """
    Represents a Scrabble game between two players. The players are differentiated at this stage by the
    URL they use to access the game. There is no difference between the "first" and "second" player.
    """

    players = orm.Set(User, reverse="games")

    # The source-of-truth state of the board
    board = orm.Required(str)

    turn_state = orm.Set(TurnState, reverse="game")

    # The current round of the game, indexed from 1
    round = orm.Required(int)

    def has_player(self, player):
        return player.id in (existing_player.id for existing_player in self.players)

