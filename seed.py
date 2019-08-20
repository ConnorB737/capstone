from pony.orm import commit, db_session, select
from werkzeug.security import generate_password_hash

from config import APP_ENV
from models.game import Game
from models.user import User
from service.game_service import build_game, join_existing_game


@db_session
def seed_database_for_development():

    if APP_ENV == 'development':

        first_player = select(user for user in User if user.login == "first_player@email.com").first()
        if first_player is None:
            first_player = User(
                login="first_player@email.com",
                password=generate_password_hash("password"),
            )

        second_player = select(user for user in User if user.login == "second_player@email.com").first()
        if second_player is None:
            second_player = User(
                login="second_player@email.com",
                password=generate_password_hash("password"),
            )

        commit()

        if select(game for game in Game if first_player in game.players and second_player in game.players).first() is None:
            joined_game = build_game(first_player)
            join_existing_game(joined_game.id, second_player)

        if select(game for game in Game if first_player in game.players and second_player not in game.players).first() is None:
            build_game(first_player)

        commit()