from models.database import db
from models.board import BoardState
from models.user import User
from models.game import Game


db.generate_mapping(create_tables=True)
