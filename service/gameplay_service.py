from pony.orm import commit

from models.board import BoardState
from models.game import Game
from models.user import User

scoring_info = {
    "LETTERS": {
        "A":1,
        "B":3,
        "C":3,
        "D":2,
        "E":1,
        "F":4,
        "G":2,
        "H":4,
        "I":1,
        "J":8,
        "K":5,
        "L":1,
        "M":3,
        "N":1,
        "O":1,
        "P":3,
        "Q":10,
        "R":1,
        "S":1,
        "T":1,
        "U":1,
        "V":4,
        "W":4,
        "X":8,
        "Y":4,
        "Z":10
    },
    "TW2": [
        [7, 0],
        [7, 14],
        [0, 0],
        [0, 7],
        [0, 14],
        [14, 0],
        [14, 7],
        [14, 14],
    ],
    "TL2": [
        [7, 3],
        [7, 11],
        [5, 1],
        [5, 3],
        [5, 12],
        [5, 14],
        [9, 1],
        [9, 3],
        [9, 12],
        [9, 14],
        [3, 7],
        [11, 7],
        [1, 5],
        [1, 9],
        [13, 5],
        [13, 9],
        [0, 3],
        [0, 4],
        [0, 10],
        [0, 11],
        [14, 3],
        [14, 4],
        [14, 10],
        [14, 11],
    ],
    "ST2": [
        [7, 7],
    ],
    "DL2": [
        [6, 2],
        [6, 4],
        [6, 6],
        [6, 8],
        [6, 10],
        [6, 12],
        [8, 2],
        [8, 4],
        [8, 6],
        [8, 8],
        [8, 10],
        [8, 12],
        [4, 0],
        [4, 6],
        [4, 8],
        [4, 14],
        [10, 0],
        [10, 6],
        [10, 8],
        [10, 14],
        [3, 0],
        [3, 14],
        [11, 0],
        [11, 14],
        [2, 1],
        [2, 6],
        [2, 8],
        [2, 13],
        [12, 1],
        [12, 6],
        [12, 8],
        [12, 13],
        [1, 2],
        [1, 12],
        [13, 2],
        [13, 12],
    ],
    "DW2": [
        [5, 5],
        [5, 9],
        [9, 5],
        [9, 9],
        [4, 4],
        [4, 10],
        [10, 4],
        [10, 10],
        [3, 3],
        [3, 11],
        [11, 3],
        [11, 11],
        [2, 2],
        [2, 12],
        [12, 2],
        [12, 12],
        [1, 1],
        [1, 13],
        [13, 1],
        [13, 13],
    ],
};

#TW2 - triple score for entire word
#TL2 - triple score for letter
#DW2 - double score for entire word
#DL2 - double score for letter
#ST2 - is the center, doubles score for the first word
#include double/triple scored letters before doubling entire word score

def calculate_word_score(game_id, wordArray):
    doubleWord = False
    tripleWord = False
    score = 0
    
    game = Game[game_id]
    board = BoardState.deserialize(game.board).get_state()
    direction = 0 if wordArray[0]["x"] != wordArray[1]["x"] else 1
    wordArray += get_adjacent_tiles(wordArray[0]["x"], wordArray[0]["y"], board, direction, wordArray)
    
    for letter in wordArray:
        score += scoring_info["LETTERS"][letter["value"]]
        coords = [letter["x"], letter["y"]]
        if (coords in scoring_info["TW2"]):
            tripleWord = True
        elif (coords in scoring_info["DW2"] + scoring_info["ST2"]):
            doubleWord = True
        elif (coords in scoring_info["TL2"]):
            score += scoring_info["LETTERS"][letter["value"]] * 2
        elif (coords in scoring_info["DL2"]):
            score += scoring_info["LETTERS"][letter["value"]]

    if(doubleWord): score *= 2
    if(tripleWord): score *= 3

    print("Score", score)
    return score

def get_adjacent_tiles(startX, startY, board, direction, word): #returns tiles of adjacent words
    adjTiles = []
    if (direction == 0): #horitzonal
        x = startX
        if(startX + len(word) > 15): return []
        while x < startX + len(word) and x < 15:
            if (startY - 1 >= 0 and board[startY - 1][x] != None) or (startY + 1 < 15 and board[startY + 1][x] != None):
                adjY = startY
                while(adjY - 1 > 0 and board[adjY - 1][x] != None ):
                    adjY -= 1
                while(adjY < 15 and (board[adjY][x] != None or adjY == startY)):
                    if adjY == startY:
                        adjTiles += [word[x - startX]]
                    else:
                        adjTiles += [{"x":x, "y":adjY, "value":board[adjY][x]}]
                    adjY += 1
            x += 1
    else: #vertical
        y = startY
        if(startY + len(word) > 15): return []
        while y < startY + len(word) and y < 15:
            if (startX - 1 >= 0 and board[y][startX - 1] != None) or (startX + 1 < 15 and board[y][startX + 1] != None):
                adjX = startX
                while(adjX - 1 > 0 and board[y][adjX - 1] != None):
                    adjX -= 1
                while(adjX < 15 and (board[y][adjX] != None or adjX == startX)):
                    if adjX == startX:
                        adjTiles += [word[y - startY]]
                    else:
                        adjTiles += [{"x":adjX, "y":y, "value":board[y][adjX]}]
                    adjX += 1
            y += 1
    return adjTiles
