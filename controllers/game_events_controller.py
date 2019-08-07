from models.types import EventType


def attach_controller(socketio):

    @socketio.on(EventType.JOIN_GAME.value)
    def handle_join_game(_):
        socketio.emit(EventType.GAME_JOINED.value)

