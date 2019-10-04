import random
from typing import Optional, List

from pony import orm
from pony.orm import StrArray

from models.database import db
from models.mixins import HasPlayer


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
    def swap(self, incoming_tile: str) -> Optional[list]:
        outgoing_list = []
        if self.tiles_left() > len(incoming_tile):
            for tile in incoming_tile:
                outgoing_tile = self.bag.pop()
                self.bag.append(tile)
                random.shuffle(self.bag)

                while outgoing_tile == tile:
                    self.bag.append(outgoing_tile)
                    random.shuffle(self.bag)
                    outgoing_tile = self.bag.pop()

                outgoing_list.append(outgoing_tile)
            return outgoing_list
        else:
            return None

    # Return number of tiles left
    def tiles_left(self):
        return len(self.bag)

    def pop(self):
        return self.bag.pop()


class Rack(db.Entity, HasPlayer):
    game = orm.Required("Game", reverse="racks")
    human_player = orm.Optional("User", reverse="racks")
    # The index of AI player for the game
    ai_player = orm.Optional(int)
    tiles = orm.Optional(StrArray)

    def remove(self, tile):
        self.tiles.remove(tile)

