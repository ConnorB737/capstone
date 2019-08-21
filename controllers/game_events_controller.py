import json

from flask_socketio import SocketIO
from pony.orm import select, db_session

from models.game import Game
from models.board import BoardState
from models.types import EventType


def attach_controller(socketio: SocketIO):

    @socketio.on(EventType.JOIN_GAME.value)
    def handle_join_game(_):
        socketio.emit(EventType.GAME_JOINED.value)

    @socketio.on(EventType.GET_GAMES.value)
    @db_session
    def get_games_list():
        print(f"Received {EventType.GET_GAMES.value} event")
        games = select(game for game in Game)[:]
        response = json.dumps({
            "games": [{'id': game.id} for game in games],
        })
        print(f"Sending response: {response}")
        socketio.emit(EventType.GAMES_LIST.value, response)

    # @socketio.on(EventType.GET_BOARD.value)
    # def get_board():
    #     print(f"Received {EventType.GET_BOARD.value} event")
    #     response = "testing"
    #
    #     print(f"Sending response: {response}")
    #     socketio.emit(EventType.GET_BOARD.value, response)
