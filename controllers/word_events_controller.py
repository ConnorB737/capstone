from models.types import EventType


def attach_controller(socketio):

    @socketio.on(EventType.PLACE_WORD.value)
    def handle_join_game(message):
        print(f"Received {message}")
        socketio.emit(EventType.WORD_ACCEPTED.value)

