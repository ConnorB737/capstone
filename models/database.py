from pony import orm

db = orm.Database()
db.bind(provider='postgres', user='scrabble', password='scrabble', host='localhost', database='scrabble')
