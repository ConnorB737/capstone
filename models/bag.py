import random
class TilesBag:

    def __init__(self):

        self.bag = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'F', 'F', 'G', 'G', 'G', 'H', 'H', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'J', 'K', 'L', 'L', 'L', 'L', 'M', 'M', 'N', 'N', 'N', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'P', 'P', 'Q', 'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'T', 'T', 'U', 'U', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'Y', 'Y', 'Z']
        random.shuffle(self.bag)
        self.rack = self.bag[:7]
        self.rest = self.bag[7:]

    #  recieve a index of rack list, swap with the first different element in the rest list
    def swap(self,index):
        temp = self.rack[index]
        if len(self.rest) > 0:
            for i in range(len(self.rest)):
                if self.rest[i] != temp:
                    self.rack[index] = self.rest[i]
                    self.rest[i] = temp
                    self.bag = self.rack + self.rest
                    break
        else:
            return False
    
    # once player click play button, remove letters from rack list.
    def remove(self,word):
        for letter in word:
            self.rack.remove(letter)
        self.bag = self.rack + self.rest
        self.rack=self.bag[:7]
        self.rest=self.bag[7:]
        
    # return number of tiles left 
    def tiles_left(self):
        return len(self.bag)