from models.database import db
from models.board import BoardState
from models.user import User
from models.game import Game
from models.round import Round, RoundAction
from models.tile_bag import TileBag, Rack


db.generate_mapping(create_tables=True)
