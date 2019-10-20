import json
import os


class TrieNode:
    def __init__(self):
        self.children = [None] * 26
        self.terminating = False #true if end of word


class Trie:
    def __init__(self):
        self.root = TrieNode()
        
        word_list = json.load(open(os.path.abspath(os.path.join(os.path.dirname(__file__), "words.json"))))["wordList"]
        self.build(word_list)
     
    def char_to_index(self, ch):
        return ord(ch) - ord('A')
        
    def build(self, word_list):
        for word in word_list:
            self.insert(word)
        
    def insert(self, word): 
        currentNode = self.root
        for letter in word:
            i = self.char_to_index(letter)
            
            if currentNode.children[i] == None: #if letter not in trie
                currentNode.children[i] = TrieNode()
            currentNode = currentNode.children[i]
            
        currentNode.terminating = True #is last letter
    
    def search(self, word):
        word = word.upper()
    
        currentNode = self.root
        for letter in word:
            i = self.char_to_index(letter)
            if currentNode.children[i] == None:
                return False
            currentNode = currentNode.children[i]
        return (currentNode != None and currentNode.terminating)
