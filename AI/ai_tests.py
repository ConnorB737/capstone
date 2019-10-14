import AI 

# board = [
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, "D", None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, "I", None, None, None, None, None, None], 
# [None, None, None, None, None, None, "B", "A", "G", None, None, None, None, None, None], 
# [None, None, None, None, None, None, "I", None, None, None, None, None, None, None, None], 
# [None, "O", "B", "L", "O", "N", "G", None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, "G", None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, "E", None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, "R", None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
# [None, None, None, None, None, None, None, None, None, None, None, None, None, None, None]]
board = [
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, "B", "A", "G", None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None], 
[None, None, None, None, None, None, None, None, None, None, None, None, None, None, None]]

def print_board_nicely(board):
    for y in board:
        for x in y:
            if x == None:
                print("-", end="")
            else:
                print(x, end="")
        print()

print_board_nicely(board)

ai = AI.AIWordPlacer()

for x in range(10):
	ai.place_word(board)
		
	print()
	print_board_nicely(board)
