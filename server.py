from flask import Flask
from flask_socketio import SocketIO
from pony.flask import Pony
from pony.orm import set_sql_debug

from models.database import db

socketio = SocketIO()


def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"
    socketio.init_app(app)

    from controllers.api_controller import attach_controller as attach_api_controller
    attach_api_controller(app)

    from controllers.game_events_controller import attach_controller as attach_game_controller
    attach_game_controller(socketio)

    from controllers.word_events_controller import attach_controller as attach_word_controller
    attach_word_controller(socketio)

    set_sql_debug(True)
    db.generate_mapping(create_tables=True)

    Pony(app)

    return app


if __name__ == "__main__":
    app = create_app()
    socketio.run(app, debug=True)
