from models.types import EventType
from pony.orm import select, db_session
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
        ##

        socketio.emit(EventType.WORD_ACCEPTED.value)

