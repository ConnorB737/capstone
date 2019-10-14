from pony import orm
from config import CONFIG

db = orm.Database()

db.bind(**CONFIG['DATABASE_SETTINGS'])
