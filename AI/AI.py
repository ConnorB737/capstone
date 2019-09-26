import trie
import itertools
import random
import time

class AI:
    def __init__(self):
        self.letters = ["A", "B", "C", "D", "G", "E", "R"]
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
                
                while startX > 0 and board[y][startX-1] != None:
                    startX -= 1
                
                startX = startX - random.randint(0, 3)
                if startX < 0: startX = 0
                
                xIndex = startX
                while xIndex < 15 and xIndex <= x + 7:
                    conditions.append(board[y][xIndex])
                    xIndex += 1
                    
                location = loc
            else:
                direction = 1
                
                x = loc['x']
                y = loc['y']
                
                startX = x
                startY = y
                
                while startY > 0 and board[startY-1][x] != None:
                    startY -= 1
                
                startY = startY - random.randint(0, 3)
                if startY < 0: startY = 0
                
                yIndex = startY
                while yIndex < 15 and yIndex <= y + 7:
                    conditions.append(board[yIndex][x])
                    yIndex += 1
                    
                location = loc
            
            #trying to fulfill those conditions
            letters = self.letters 
            
            words = self.get_words(startX, startY, board, direction, conditions)

        return self.word_to_tiles(startX, startY, random.choice(words), direction)
    
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
            while x < startX + len(word):
                if (startY - 1 >= 0 and board[startY - 1][x] != None) or (startY + 1 < 15 and board[startY + 1][x] != None):
                    adjWord = []
                    adjY = startY
                    while(adjY - 1 > 0 and board[adjY - 1][x] != None):
                        adjY -= 1
                    while(board[adjY][x] != None):
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
            while y < startY + len(word):
                if (startX - 1 >= 0 and board[y][startX - 1] != None) or (startX + 1 < 15 and board[y][startX + 1] != None):
                    adjWord = []
                    adjX = startX
                    while(adjX - 1 > 0 and board[y][adjX - 1] != None):
                        adjX -= 1
                    while(board[y][adjX] != None):
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
        for x in conditions: 
            if x == None:
                min_length += 1
            else: break
            
        for i in range(7, min_length, -1):
            permutations = list(itertools.permutations(letters, i))
            for p in permutations:
                word = ''.join(p)
                word_as_list = list(word)
                for conditionIndex in range(len(conditions)):
                    if conditions[conditionIndex] != None:
                        word_as_list.insert(conditionIndex, conditions[conditionIndex])
                word = ''.join(word_as_list)

                if(self.trie.search(word) and self.check_word(startX, startY, board, direction, word)):
                    words.append(word)
        return words