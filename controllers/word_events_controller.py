from models.types import EventType
import json
from pony.orm import select, db_session
from models.game import Game

def attach_controller(socketio):

    @socketio.on(EventType.PLACE_WORD.value)
    @db_session
    def handle_join_game(message):
        print(f"Received {message}")

        #will need more checking done in the future,
        #just getting something displaying from one
        #game to the next currently.

        games = select(game for game in Game)[:]
        if(len(games) > 0):
            newBoard = json.loads(games[0].board)
            for sp in message["startingPosition"]:
                newBoard[sp[0]][sp[1]] = sp[2]
            games[0].board = json.dumps(newBoard)

        ##

        socketio.emit(EventType.WORD_ACCEPTED.value)

