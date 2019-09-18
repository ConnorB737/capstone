from models.board import BoardState
from models.types import EventType
from pony.orm import select, db_session
from models.game import Game


def attach_controller(socketio):

    @socketio.on(EventType.PLACE_WORD.value)
    @db_session
    def place_word(message):
        print(f"Received {message}")

        #will need more checking done in the future,
        #just getting something displaying from one
        #game to the next currently.

        games = select(game for game in Game)[:]
        if len(games) > 0:
            board = BoardState.deserialize(games[0].board)
            for tile_position in message["startingPosition"]:
                board.place_tile(tile_position["x"], tile_position['y'], tile_position['value'])
            games[0].board = board.serialize()

        ##
        socketio.emit(EventType.WORD_ACCEPTED.value)

