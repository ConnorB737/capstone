import random
from typing import Optional, List

from pony import orm
from pony.orm import StrArray

from models.database import db


class TileBag(db.Entity):

    bag = orm.Required(StrArray)
    game = orm.Optional("Game", reverse="tile_bag")

    @classmethod
    def build_bag(cls):
        bag = (
                ['A'] * 9 +
                ['B'] * 2 +
                ['C'] * 2 +
                ['D'] * 4 +
                ['E'] * 12 +
                ['F'] * 2 +
                ['G'] * 3 +
                ['H'] * 2 +
                ['I'] * 9 +
                ['J'] * 1 +
                ['K'] * 1 +
                ['L'] * 4 +
                ['M'] * 2 +
                ['N'] * 6 +
                ['O'] * 8 +
                ['P'] * 2 +
                ['Q'] * 1 +
                ['R'] * 6 +
                ['S'] * 4 +
                ['T'] * 6 +
                ['U'] * 4 +
                ['V'] * 2 +
                ['W'] * 2 +
                ['X'] * 1 +
                ['Y'] * 2 +
                ['Z'] * 1
        )
        random.shuffle(bag)
        return cls(
            bag=bag,
        )

    def fill_rack(self, tiles_to_return: int = 7):
        return [self.bag.pop() for _ in range(tiles_to_return)]

    # Swap a tile with another tile
    def swap(self, incoming_tile: str) -> Optional[str]:
        if self.tiles_left():
            outgoing_tile = self.bag.pop()
            self.bag += incoming_tile

            # self.bag.append(incoming_tile)
            random.shuffle(self.bag)

            while [outgoing_tile] == incoming_tile:
                self.bag.append(outgoing_tile)
                random.shuffle(self.bag)
                outgoing_tile = self.bag.pop()

            return outgoing_tile
        else:
            return None

    # Return number of tiles left
    def tiles_left(self):
        return len(self.bag)


class Rack(db.Entity):

    game = orm.Required("Game", reverse="racks")
    player = orm.Required("User", reverse="racks")
    tiles = orm.Optional(StrArray)
