from AI import trie
import itertools
import random
import time


class AIWordPlacer:
    def __init__(self):
        self.letters = ["T", "D", "C", "I", "G", "E", "R"]
        self.trie = trie.Trie()
    
    def find_valid_word(self, board):
        locations = self.get_placeable_locations(board)
        location = {'x':0,'y':0,'value':"A"} #need some handling when location doesnt get found
        words = []
        startX = 0
        startY = 0
        direction = 0 #0 for horizontally, 1 for vertically
        
        while (len(words) == 0):
            #conditions of placement
            conditions = [] #list of compulsory letters, blank spaces representing free spots
            loc = random.choice(locations)
            
            if not random.randint(0, 1): #try placing horizontally
                direction = 0
                
                x = loc['x']
                y = loc['y']
                
                startX = x
                startY = y
                
                randbackwards = random.randint(0, 7)
                if(startX - randbackwards-1 > 0):
                    startX = startX - randbackwards
                    
                while startX > 0 and board[y][startX-1] != None:
                    startX -= 1
                
                xIndex = startX
                while xIndex < 15 and (xIndex <= x + 7 or board[xIndex][y] != None):
                    conditions.append(board[y][xIndex])
                    xIndex += 1
                    
                location = loc
            else:
                direction = 1
                
                x = loc['x']
                y = loc['y']
                
                startX = x
                startY = y
                
                
                randbackwards = random.randint(0, 7)
                if(startY - randbackwards-1 > 0):
                    startY = startY - randbackwards
                
                while startY > 0 and board[startY-1][x] != None:
                    startY -= 1
                
                yIndex = startY
                while yIndex < 15 and (yIndex <= y + 7 or board[yIndex][x] != None):
                    conditions.append(board[yIndex][x])
                    yIndex += 1
                    
                location = loc
            
            #trying to fulfill those conditions
            letters = self.letters 
            
            words = self.get_words(startX, startY, board, direction, conditions)
        
        w = random.choice(words)
        print(w)
        print(conditions)
        return self.word_to_tiles(startX, startY, w, direction)
    
    def place_word(self, board):
        word_tiles = self.find_valid_word(board)
        for tile in word_tiles:
            board[tile['y']][tile['x']] = tile['value']
    
    def word_to_tiles(self, x, y, word, direction): #only does horizontally atm
        tiles = []
        for letter in word:
            tiles.append({'x':x, 'y':y, 'value':letter})
            if(direction == 0):
                x += 1
            else:
                y += 1
        return tiles
    
    def get_placeable_locations(self, board):
        letters = self.letters
        
        locations = []
        
        for y in range(15): 
            for x in range(15):
                if board[y][x] != None:
                    locations.append({'x':x, 'y':y, 'value':board[y][x] })
        return locations
    
    def check_word(self, startX, startY, board, direction, word): #checks all adjacent words are valid
        if (direction == 0): #horitzonal
            x = startX
            if(startX + len(word) > 14): return False
            while x < startX + len(word) and x < 15:
                if (startY - 1 >= 0 and board[startY - 1][x] != None) or (startY + 1 < 15 and board[startY + 1][x] != None):
                    adjWord = []
                    adjY = startY
                    while(adjY - 1 > 0 and board[adjY - 1][x] != None ):
                        adjY -= 1
                    while(adjY < 15 and (board[adjY][x] != None or adjY == startY)):
                        if adjY == startY:
                            adjWord += word[x - startX]
                        else:
                            adjWord += board[adjY][x]
                        adjY += 1
                    if not self.trie.search("".join(adjWord)):
                        return False
                x += 1
        else: #vertical
            y = startY
            if(startY + len(word) > 14): return False
            while y < startY + len(word) and y < 15:
                if (startX - 1 >= 0 and board[y][startX - 1] != None) or (startX + 1 < 15 and board[y][startX + 1] != None):
                    adjWord = []
                    adjX = startX
                    while(adjX - 1 > 0 and board[y][adjX - 1] != None):
                        adjX -= 1
                    while(adjX < 15 and (board[y][adjX] != None or adjX == startX)):
                        if adjX == startX:
                            adjWord += word[y - startY]
                        else:
                            adjWord += board[y][adjX]
                        adjX += 1
                    if not self.trie.search("".join(adjWord)):
                        return False
                y += 1
        return True
        
    def get_words(self, startX, startY, board, direction, conditions):
        letters = self.letters
        words = [] 
        
        min_length = 1
        for x in range(len(conditions)): 
            if conditions[x] != None:
                min_length = x
        lengths = list(range(7, min_length, -1))
        random.shuffle(lengths)
        for i in lengths:
            permutations = list(itertools.permutations(letters, i))
            for p in permutations:
                word = ''.join(p)
                word_as_list = list(word)
                for conditionIndex in range(len(conditions)):
                    if conditions[conditionIndex] != None:
                        word_as_list.insert(conditionIndex, conditions[conditionIndex])
                word = ''.join(word_as_list)

                if(self.trie.search(word) and self.check_word(startX, startY, board, direction, word)):
                    return [word]
        return words