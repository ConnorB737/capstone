import json

from flask_login import login_user
from flask_socketio import SocketIO
from pony.orm import select, db_session, commit
from werkzeug.security import check_password_hash, generate_password_hash

from models.types import EventType


from models.user import User


def attach_controller(socketio: SocketIO):

    @socketio.on(EventType.LOGIN.value)
    @db_session
    def handle_login(message):
        check_user = select(user for user in User if user.login == message["email"]).first()
        if check_user:
            if check_password_hash(check_user.password, message["password"]):
                login_user(check_user)
                socketio.emit(EventType.USER_LOGGED_IN.value, json.dumps({
                    'id': check_user.id,
                    'login': check_user.login,
                }))
                return

    @socketio.on(EventType.REGISTER.value)
    @db_session
    def handle_register(message):
        user = User(login=message["email"], password=generate_password_hash(message["password"]))
        commit()
        socketio.emit(EventType.USER_LOGGED_IN.value, json.dumps({
            'id': user.id,
            'login': user.login,
        }))
        return
