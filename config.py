import os


APP_ENV = os.getenv("FLASK_ENV", "development")


CONFIG = {
    "development": {
        'DATABASE_SETTINGS': dict(
            provider="sqlite",
            filename="scrabble.sqlite",
            create_db=True,
        ),
        'FLASK': dict(
            static_folder="build",
            template_folder="build",
            static_url_path="/"
        ),
    },
    "production": {
        'DATABASE_SETTINGS': dict(
            provider='postgres',
            user='scrabble',
            password='scrabble',
            host='localhost',
            database='scrabble',
        ),
    },
}.get(APP_ENV)
