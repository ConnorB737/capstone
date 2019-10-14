import json

from flask import session, request
from flask_login import current_user
from models.round import RoundAction, Round
from models.user import User
from models.types import EventType
from pony.orm import select, db_session, commit
from models.game import Game
from service.word_service import place_word, pass_round


def attach_controller(socketio):

    @socketio.on(EventType.PLACE_WORD.value)
    @db_session
    def place_word_controller(message):
        print(f"Received {message}")

        #will need more checking done in the future,
        #just getting something displaying from one
        #game to the next currently.

        game = Game[session['game_id']]
        place_word(game, current_user._get_current_object(), message["word"], message["startingPosition"])
        rack = game.racks.filter(lambda r: r.human_player == current_user).first()
        tile_bag = game.tile_bag

        for tile in message["temp_rack"]:
            for i in range(len(rack.tiles)):
                if rack.tiles[i] == tile:
                    rack.tiles.pop(i)
                    rack.tiles.append(tile_bag.pop())
                    break

        commit()

        socketio.emit(EventType.GAMES_UPDATED.value, room=session['game_id'])

    @socketio.on(EventType.GET_RACK.value)
    @db_session
    def get_rack():
        print(f"Request from {request.sid} to get rack")
        game = Game[session['game_id']]
        rack = game.racks.filter(lambda r: r.human_player == current_user).first()

        print(f"Sending response to {request.sid} with rack {json.dumps(rack.tiles)}")
        socketio.emit(EventType.GET_RACK.value, json.dumps(rack.tiles), room=request.sid)

    @socketio.on(EventType.SWAP_TILE.value)
    @db_session
    def swap_tiles(message):
        game = Game[session['game_id']]
        tile_bag = game.tile_bag
        rack = game.racks.filter(lambda r: r.human_player == current_user).first()
        
        # Remove the tile from the rack
        tiles_to_remove = message['tiles']
        for tile in tiles_to_remove:
            rack.tiles.remove(tile)

        # Fill rack
        new_tiles = tile_bag.swap(tiles_to_remove)
        for tile in new_tiles:
            rack.tiles.append(tile)

        commit()

        socketio.emit(EventType.GET_RACK.value, json.dumps(rack.tiles), room=request.sid)
        socketio.emit(EventType.GAMES_UPDATED.value, room=session['game_id'])

    @socketio.on(EventType.GET_TILES_LEFT.value)
    @db_session
    def get_tiles_left():
        game = Game.select().first()
        tile_bag = game.tile_bag

        socketio.emit(EventType.GET_TILES_LEFT.value, json.dumps(tile_bag.tiles_left()), room=request.sid)

    @socketio.on(EventType.GET_HISTORY.value)
    @db_session
    def get_history():
        game = Game.select().first()
        history = game.words_history

        socketio.emit(EventType.GET_HISTORY.value, json.dumps(history), room=request.sid)

    @socketio.on(EventType.PASS_ROUND.value)
    @db_session
    def pass_round_view():
        game = game = Game[session['game_id']]
        pass_round(game, current_user._get_current_object())

        socketio.emit(EventType.GAMES_UPDATED.value, room=session['game_id'])
