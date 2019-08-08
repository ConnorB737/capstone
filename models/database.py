from pony import orm
from config import DATABASE_PROVIDER

db = orm.Database()

if DATABASE_PROVIDER == "postgres":
    db.bind(
        provider='postgres',
        user='scrabble',
        password='scrabble',
        host='localhost',
        database='scrabble',
    )
elif DATABASE_PROVIDER == "sqlite":
    db.bind(
        provider="sqlite",
        filename="scrabble.sqlite",
        create_db=True,
    )
else:
    raise ValueError(f"Unexpected database provider: {DATABASE_PROVIDER}")