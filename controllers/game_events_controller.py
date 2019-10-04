import json

from flask import session
from flask_login import current_user
from flask_socketio import SocketIO, join_room
from pony.orm import select, db_session

from models.game import Game
from models.types import EventType
from service.game_service import build_game


def attach_controller(socketio: SocketIO):

    @socketio.on(EventType.CREATE_GAME.value)
    def handle_create_game(message):
        game = build_game(
            first_player=current_user,
            human_player_count=message['human_player_count'],
            ai_player_count=message['ai_player_count'],
        )
        join_room(game.id)
        session['game_id'] = game.id
        socketio.emit(EventType.GAMES_UPDATED.value)

    @socketio.on(EventType.JOIN_GAME.value)
    def handle_join_game(message):
        join_room(message['game_id'])
        session['game_id'] = message['game_id']
        socketio.emit(EventType.GAMES_UPDATED.value)

    @socketio.on(EventType.GET_GAMES.value)
    @db_session
    def get_games_list():
        print(f"Received {EventType.GET_GAMES.value} event")
        open_games = []
        joined_games = []
        ready_games = []
        for game in select(game for game in Game)[:]:
            if game.has_human_player(current_user):
                if game.is_ready():
                    ready_games.append(game)
                else:
                    joined_games.append(game)
            elif not game.is_ready():
                open_games.append(game)
        response = json.dumps({
            "openGames": [{'id': game.id} for game in open_games],
            "joinedGames": [{'id': game.id} for game in joined_games],
            "readyGames": [{'id': game.id} for game in ready_games],
        })
        print(f"Sending response: {response}")
        socketio.emit(EventType.GAMES_LIST.value, response)

    @socketio.on(EventType.GET_BOARD.value)
    @db_session
    def get_board():
        print(f"Received {EventType.GET_BOARD.value} event")
        game = Game[session['game_id']]
        response = game.board

        print(f"Sending response: {response}")
        socketio.emit(EventType.GET_BOARD.value, response)

    @socketio.on(EventType.GET_SCORES.value)
    @db_session
    def get_scores():
        print(f"Received {EventType.GET_SCORES.value} event")
        game = Game[session['game_id']]
        response = json.dumps({
            score.user.id: score.value
            for score
            in game.scores
        })

        print(f"Sending response: {response}")
        socketio.emit(EventType.SCORES_LIST.value, response)
