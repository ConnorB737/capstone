import urllib

from flask import jsonify, request, render_template
from pony.orm import select
from werkzeug.exceptions import NotFound

from models.game import Game
from service.game_service import build_game


def attach_controller(app):

    @app.route("/game", methods=["POST"])
    def create_game():
        game = build_game()
        return jsonify({
            'first_player_url': urllib.parse.urljoin(request.base_url, f'game/{game.first_player_url}'),
            'second_player_url': urllib.parse.urljoin(request.base_url, f'game/{game.second_player_url}'),
        })

    @app.route("/game/<game_uuid>", methods=["GET"])
    def join_game(game_uuid):
        games = select(
            game for game in Game
            if (
                    game.first_player_url == game_uuid
                    or game.second_player_url == game_uuid
            )
        )[:]
        if len(games) != 1:
            raise NotFound()
        else:
            return render_template("board.html")

    # @app.route("/typo/dictionaries/en_US/en_US.aff")
    # def aff():
    # return Response(open("/typo/dictionaries/en_US/en_US.aff").read(), mimetype='text/plain')

    # @app.route("/typo/dictionaries/en_US/en_US.dic")
    # def dic():
    # return Response(open("/typo/dictionaries/en_US/en_US.dic").read(), mimetype='text/plain')
