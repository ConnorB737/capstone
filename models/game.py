from pony import orm

from models.database import db
from models.score import Score
from models.tile_bag import TileBag, Rack
from models.history import History
from models.turn_state import TurnState
from models.user import User


class Game(db.Entity):
    """
    Represents a Scrabble game between player_count players.
    """

    # The set of human players
    human_players = orm.Set(User, reverse="games")

    # Total number of players
    human_player_count = orm.Required(int)

    # Number of AI players
    ai_player_count = orm.Required(int)

    # The source-of-truth state of the board
    board = orm.Required(str)

    turn_state = orm.Set(TurnState, reverse="game")

    # The current round of the game, indexed from 1
    round = orm.Required(int)

    scores = orm.Set(Score, reverse="game")

    tile_bag = orm.Required(TileBag, reverse="game")

    racks = orm.Set(Rack, reverse="game")

    def has_human_player(self, player):
        return player.id in (existing_player.id for existing_player in self.human_players)

    words_history = orm.Required(History, reverse = "game")

    def is_ready(self):
        return len(self.human_players) == self.human_player_count
