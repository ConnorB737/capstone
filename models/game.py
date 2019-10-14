from typing import Union, List

from pony import orm

from models.database import db
from models.tile_bag import TileBag, Rack
from models.round import Round, RoundAction
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
            return max(self.rounds, key=lambda round: round.round_number)
        else:
            return None

    def current_round_as_round_type(self):
        if self.is_ready():
            max_round = None
            for round in self.rounds:
                if max_round == None:
                    max_round = round
                elif round.round_number > max_round:
                    max_round = round
            return max_round
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
            round_action.word
            for game_round in self.rounds.order_by(Round.round_number)
            for round_action in game_round.round_actions.order_by(RoundAction.occurred_at)
            if round_action.word is not None
        ]

    def total_player_count(self):
        return self.human_player_count + self.ai_player_count
