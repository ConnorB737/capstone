f = open("words.txt")
words = f.read().replace("[","").replace("]","").replace("\"","").split(" ")[3].split(",")
w = open("prunedWords.txt", "w")

w.write("var wordsArray = [")
for word in words:
    if len(word) > 1 and "'" not in word and "é" not in word and ";" not in word and not any(x.isupper() for x in word):
        w.write("\"" + word.upper() + "\"" + ",") #remove the comma manually
w.write("]")