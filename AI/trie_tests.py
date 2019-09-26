import trie
import itertools
import time

trie = trie.Trie()

start_time = time.time()

letters = "ABCDEFG"
words = [] 
for i in range(7, 1, -1):
    permutations = list(itertools.permutations(letters, i))
    for p in permutations:
        word = ''.join(p)
        if(trie.search(word)):
            words.append(word)

end_time = time.time()
print(words)
print("Takes", end_time - start_time, "seconds to find all words given a length 7 permutation")