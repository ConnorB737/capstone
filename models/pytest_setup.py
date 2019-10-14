from models.database import db
from models.board import BoardState
from models.user import User
from models.game import Game
from models.score import Score


db.generate_mapping(create_tables=True)
