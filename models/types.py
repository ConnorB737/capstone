import enum


class EventType(enum.Enum):
    """
    The socket events passed between the client and server.
    """

    # Events related to starting a game
    JOIN_GAME = "join_game"
    GAME_JOINED = "game_joined"

    # Events related to placing a word
    PLACE_WORD = "place_word"
    WORD_ACCEPTED = "word_accepted"
    WORD_REJECTED = "word_rejected"

    # Events related to displaying the board
    GET_BOARD = "get_board"
    BOARD_STATE = "board_state"

    # Events related to allowing the user to make certain actions
    GET_STATUS = "get_status"
    GAME_STATUS = "game_status"