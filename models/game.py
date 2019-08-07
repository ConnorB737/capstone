from pony import orm

from models.database import db


class Game(db.Entity):
    """
    Represents a Scrabble game between two players. The players are differentiated at this stage by the
    URL they use to access the game. There is no difference between the "first" and "second" player.
    """

    # The path indicating that the player is the "first" player in the game
    first_player_url = orm.Required(str, unique=True)

    # The path indicating that the player is the "second" player in the game
    second_player_url = orm.Required(str, unique=True)

    # The source-of-truth state of the board
    board = orm.Required(str)

    # The current round of the game, indexed from 1
    round = orm.Required(int)

    # True if the "first" player has placed a word successfully this round
    has_first_player_placed = orm.Required(bool)

    # True if the "second" player has placed a word successfully this round
    has_second_player_placed = orm.Required(bool)
