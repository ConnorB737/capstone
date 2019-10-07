from typing import Union, List

from pony import orm

from models.database import db
from models.tile_bag import TileBag, Rack
from models.round import Round, PlacedWord
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

    rounds = orm.Set(Round, reverse="game")

    tile_bag = orm.Required(TileBag, reverse="game")

    racks = orm.Set(Rack, reverse="game")

    has_finished = orm.Required(bool)

    def has_human_player(self, player: User):
        return player in self.human_players

    def is_ready(self):
        return len(self.human_players) == self.human_player_count and not self.has_finished

    def current_round(self):
        if self.is_ready():
            return max(round.round_number for round in self.rounds)
        else:
            return None

    def rack_for_player(self, player: Union[int, User]) -> Rack:
        if isinstance(player, User):
            return self.racks.filter(lambda rack: rack.human_player == player)
        else:
            return self.racks.filter(lambda rack: rack.ai_player == player)

    @property
    def words_history(self) -> List[str]:
        return [
            placed_word
            for game_round in self.rounds.order_by(Round.round_number)
            for placed_word in game_round.placed_words.order_by(PlacedWord.placed_at)
        ]

    def total_player_count(self):
        return self.human_player_count + self.ai_player_count
