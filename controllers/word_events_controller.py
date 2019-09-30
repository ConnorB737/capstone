import json

from models.types import EventType
from pony.orm import select, db_session, commit
from models.game import Game
from service.word_service import place_word


def attach_controller(socketio):

    @socketio.on(EventType.PLACE_WORD.value)
    @db_session
    def place_word_controller(message):
        print(f"Received {message}")

        #will need more checking done in the future,
        #just getting something displaying from one
        #game to the next currently.

        games = select(game for game in Game)[:]
        user = list(user for user in games[0].players)[0]
        place_word(games[0].id, user, message["startingPosition"])
        game = Game.select().first()
        player = game.players.select().first()
        rack = game.racks.filter(lambda r: r.player == player).first()
        tile_bag = game.tile_bag
        ##
        for tile_position in message["startingPosition"]: 
            for i in range(len(rack.tiles)):
                if rack.tiles[i] ==  tile_position['value']:
                    rack.tiles.pop(i)
                    rack.tiles.append(tile_bag.pop())
                    break

        commit()

        socketio.emit(EventType.WORD_ACCEPTED.value)
        socketio.emit(EventType.GET_RACK.value, json.dumps(rack.tiles))

    @socketio.on(EventType.GET_RACK.value)
    @db_session
    def get_rack():
        game = Game.select().first()
        player = game.players.select().first()
        rack = game.racks.filter(lambda r: r.player == player).first()

        socketio.emit(EventType.GET_RACK.value, json.dumps(rack.tiles))

    @socketio.on(EventType.SWAP_TILE.value)
    @db_session
    def swap_tiles(message):
        game = Game.select().first()
        player = game.players.select().first()
        tile_bag = game.tile_bag
        rack = game.racks.filter(lambda r: r.player == player).first()

        # Remove the tile from the rack
        tiles_to_remove = message['tiles']
        for tile in tiles_to_remove:
            rack.tiles.remove(tile)

        # Fill rack
        new_tiles = tile_bag.swap(tiles_to_remove)
        for tile in new_tiles:
            rack.tiles.append(tile)

        commit()

        socketio.emit(EventType.GET_RACK.value, json.dumps(rack.tiles))

