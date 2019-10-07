from pony.orm import commit, db_session, select
from werkzeug.security import generate_password_hash

from config import APP_ENV
from models.game import Game
from models.user import User
from models.tile_bag import Rack
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

        if select(game for game in Game if first_player in game.human_players and second_player in game.human_players).first() is None:
            joined_game = build_game(
                first_player=first_player,
                human_player_count=2,
                ai_player_count=1,
            )
            join_existing_game(joined_game, second_player)

        if select(game for game in Game if first_player in game.human_players and second_player not in game.human_players).first() is None:
            build_game(
                first_player=first_player,
                human_player_count=2,
                ai_player_count=1,
            )

        commit()

        print(f"Total number of racks after seeding: {len(Rack.select()[:])}")
