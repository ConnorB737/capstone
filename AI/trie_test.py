from AI import trie
import itertools


def test_trie():
    target_trie = trie.Trie()
    letters = "ABCDEFG"
    words = []
    for i in range(7, 1, -1):
        permutations = list(itertools.permutations(letters, i))
        for p in permutations:
            word = ''.join(p)
            if target_trie.search(word):
                words.append(word)

    assert words != []
