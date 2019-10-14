import json
from collections import defaultdict
from typing import Dict, DefaultDict

from flask import session, request
from flask_login import current_user
from flask_socketio import SocketIO, join_room
from pony.orm import db_session

from models.database import db
from models.game import Game
from models.types import EventType
from service.game_service import build_game, join_existing_game


def attach_controller(socketio: SocketIO):

    @socketio.on(EventType.CREATE_GAME.value)
    @db_session
    def handle_create_game(message):
        game = build_game(
            first_player=current_user._get_current_object(),
            human_player_count=message['human_player_count'],
            ai_player_count=message['ai_player_count'],
        )
        join_room(game.id)
        session['game_id'] = game.id
        socketio.emit(EventType.GAMES_UPDATED.value, room=request.sid)

    @socketio.on(EventType.JOIN_GAME.value)
    @db_session
    def handle_join_game(message):
        join_room(message['game_id'])
        session['game_id'] = message['game_id']
        games = Game.select()
        for game in games:
            game.human_players.remove(current_user._get_current_object()) #only part of one game at a time
        join_existing_game(Game[message['game_id']], current_user._get_current_object())
        socketio.emit(EventType.GAMES_UPDATED.value, room=message['game_id'])

    @socketio.on(EventType.GET_GAMES.value)
    @db_session
    def get_games_list():
        print(f"Received {EventType.GET_GAMES.value} event")
        open_games = Game.select().filter(lambda game: not game.is_ready())[:]
        for game in open_games:
            print(
                f"Game #{game.id} has {len(game.human_players)} out of {game.human_player_count} and "
                f"is {'not ' if not game.is_ready() else ''}ready"
            )
        ready_game = Game.select().filter(lambda game: current_user in game.human_players and not game.has_finished).first()
        if ready_game:
            print(
                f"Game #{ready_game.id} has {len(ready_game.human_players)} out of {ready_game.human_player_count} and "
                f"is {'not ' if not ready_game.is_ready() else ''}ready"
            )
        response = json.dumps({
            "openGames": [{'id': game.id} for game in open_games],
            "readyGame": {'id': ready_game.id} if ready_game else None,
        })
        print(f"Sending response: {response}")
        socketio.emit(EventType.GAMES_LIST.value, response, room=request.sid)

    @socketio.on(EventType.GET_BOARD.value)
    @db_session
    def get_board():
        print(f"Received {EventType.GET_BOARD.value} event")
        game = Game[session['game_id']]
        response = game.board

        print(f"Sending response: {response}")
        socketio.emit(EventType.GET_BOARD.value, response, room=request.sid)

    @socketio.on(EventType.GET_SCORES.value)
    @db_session
    def get_scores():
        print(f"Received {EventType.GET_SCORES.value} event")
        game = Game[session['game_id']]
        current_round = game.current_round()
        players_and_scores = {}
        if current_round:
            for player in game.human_players:
                player_identifier = player.login
                players_and_scores[player_identifier] = 0
                players_and_scores[player_identifier + "_acted"] = False
                for action in current_round.round_actions:
                    if action.human_player is not None and action.human_player.login == player.login:
                        players_and_scores[player.login + "_acted"] = True
            players_and_scores["Computer_acted"] = False
            if game.ai_player_count:
                players_and_scores["Computer"] = 0
        for game_round in game.rounds:
            for placed_word in game_round.round_actions:
                if placed_word.human_player is not None:
                    players_and_scores[placed_word.human_player.login] = players_and_scores.get(placed_word.human_player.login, 0) + placed_word.score_gained
                elif placed_word.ai_player:
                    players_and_scores["Computer"] = players_and_scores.get("Computer", 0) + placed_word.score_gained
                    players_and_scores["Computer_acted"] = True

        response = json.dumps(players_and_scores)

        print(f"Sending response: {response}")
        socketio.emit(EventType.SCORES_LIST.value, response, room=request.sid)

    @socketio.on(EventType.GET_ROUND_STATUS.value)
    @db_session
    def get_round_status():
        print(f"Received {EventType.GET_ROUND_STATUS.value} event")
        game = Game[session['game_id']]
        current_round = game.current_round()
        if current_round:
            current_user_action = current_round.round_actions.filter(lambda round_action: round_action.human_player == current_user).first()
            response = json.dumps({
                "roundNumber": current_round.round_number,
                "currentRound": {
                    "actions": [round_action.to_dict() for round_action in current_round.round_actions],
                    "currentUserHasPlayed": current_user_action is not None,
                },
            })
        else:
            response = {}
        print(f"Sending response: {response}")
        socketio.emit(EventType.ROUND_STATUS.value, response, room=request.sid)

    @socketio.on(EventType.GET_PLAYERS_LEFT.value)
    @db_session
    def get_players_left():
        print(f"Received {EventType.GET_PLAYERS_LEFT.value} event")
        if session.get('game_id', False) != False:
            game = Game[session['game_id']]
            response = json.dumps({
                "playersLeft": game.human_player_count - len(game.human_players),
                "playersNeeded": game.human_player_count,
                "playersInGame": len(game.human_players),
            })
        else:
            response = json.dumps({
                "playersLeft": 0,
                "playersNeeded": 3,
                "playersInGame": 0,
            })
        print(f"Sending response: {response}")
        socketio.emit(EventType.GET_PLAYERS_LEFT.value, response, room=request.sid)
