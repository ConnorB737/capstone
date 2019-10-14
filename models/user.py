from datetime import datetime

from flask_login import UserMixin, LoginManager
from pony.orm import Required, Optional, Set, PrimaryKey

from models.database import db


login_manager = LoginManager()


class User(db.Entity, UserMixin):
    id = PrimaryKey(int, auto=True)
    login = Required(str, unique=True)
    password = Required(str)
    last_login = Optional(datetime)
    games = Set('Game', reverse="human_players")
    round_actions = Set('RoundAction', reverse='human_player')
    racks = Set('Rack', reverse='human_player')
