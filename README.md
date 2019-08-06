# 159.356 Capstone Project Group 4

## Development

1. Create a virtual environment to run the project in:

```
$ python -m venv venv
$ source venv/bin/activate
```

2. Install the dependencies:

```
$ pip install -r requirements.txt
```

3. Start a local database:

```
$ docker run -d -e POSTGRES_USER=scrabble -e POSTGRES_PASSWORD=scrabble -e POSTGRES_DB=scrabble -p 5432:5432 postgres
```

4. Run the server:

```
$ python server.py
```


