import os

from flask import Flask, render_template
from flask_socketio import SocketIO
from pony.flask import Pony
from pony.orm import set_sql_debug


from config import CONFIG
from models.database import db
from models.user import login_manager
from seed import seed_database_for_development

socketio = SocketIO()


def create_app():
    app = Flask(__name__, **CONFIG['FLASK'])
    app.config["SECRET_KEY"] = "vnkdjnfjknfl1232#"
    socketio.init_app(app)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def frontend(path):
        return app.send_static_file("index.html")

    from controllers.game_events_controller import attach_controller as attach_game_controller
    attach_game_controller(socketio)

    from controllers.word_events_controller import attach_controller as attach_word_controller
    attach_word_controller(socketio)

    from controllers.user_events_controller import attach_controller as attach_user_controller
    attach_user_controller(socketio)

    set_sql_debug(True)
    db.generate_mapping(create_tables=True)

    login_manager.init_app(app)
    login_manager.login_view = 'login'

    Pony(app)

    seed_database_for_development()

    return app


if __name__ == "__main__":
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    print(f"Application running on port {port}!")
    socketio.run(app, debug=True, host='0.0.0.0', port=port)
