# 159.356 Capstone Project Group 4 [![Travis build](https://api.travis-ci.com/ConnorB737/capstone.svg?token=rxG7iYS5KLM3msKkUa3x&branch=master)](https://travis-ci.com/ConnorB737/capstone)

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

3. In another tab, run the front-end build watcher:

```bash
$ npm run watch
```

4. Start a local database:

NOTE: Only do this if postgres is configured as the database provider in `config.py`.

```
$ docker run -d -e POSTGRES_USER=scrabble -e POSTGRES_PASSWORD=scrabble -e POSTGRES_DB=scrabble -p 5432:5432 postgres
```

5. Run the server:

```
$ python server.py
```

Visit the website on localhost:5000/ 

## Builds and deployment

The builds are visible on [Travis CI](https://travis-ci.com/ConnorB737/capstone).

Deployments are visible on [Heroku](https://dashboard.heroku.com/apps/group4-capstone-scrabble).

The deployed application is available [here](https://group4-capstone-scrabble.herokuapp.com/).

## Front-end notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


