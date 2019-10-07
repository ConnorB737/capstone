import datetime
import time

from pony import orm
from models.database import db
from models.mixins import HasPlayer


class Round(db.Entity):
    game = orm.Optional("Game", reverse="rounds")
    # The current round of the game, indexed from 1
    round_number = orm.Required(int)
    round_actions = orm.Set("RoundAction", reverse="round")


class RoundAction(db.Entity, HasPlayer):
    round = orm.Optional(Round, reverse="round_actions")
    human_player = orm.Optional("User", reverse="round_actions")
    # The index of AI player for the game
    ai_player = orm.Optional(int)
    word = orm.Optional(str)
    score_gained = orm.Optional(int)
    clicked_pass = orm.Optional(bool)
    occurred_at = orm.Optional(datetime.datetime, sql_default='CURRENT_TIMESTAMP')

    @property
    def played_word(self) -> bool:
        return self.word is not None

    def to_dict(self):
        return {
            "humanPlayer": self.human_player.id if self.human_player is not None else None,
            "aiPlayer": self.ai_player,
            "word": self.word,
            "scoreGained": self.score_gained,
            "clickedPass": self.clicked_pass,

            # Timestamp in milliseconds since epoch.
            # Convert to JavaScript Date: new Date(<occurred_at>)
            "occurredAt": int(time.mktime(self.occurred_at.timetuple())) * 1000,
        }
