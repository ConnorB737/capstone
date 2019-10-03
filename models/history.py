from typing import Optional, List
from pony import orm
from pony.orm import StrArray
from models.database import db

class History(db.Entity):

    game = orm.Optional("Game", reverse="words_history")
    words = orm.Required(StrArray)


    @classmethod
    def build_history(cls):
        words = []
        return cls(
            words=words,
        )

    def add(self, word):
        self.words.append(word)
    
    # def getHistory(self):
    #     return self.history