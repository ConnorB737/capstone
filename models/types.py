import enum


class EventType(enum.Enum):
    """
    The socket events passed between the client and server.
    """

    # Events related to starting a game
    CREATE_GAME = "create_game"
    GAMES_UPDATED = "games_updated"
    GET_GAMES = "get_games"
    GAMES_LIST = "games_list"
    JOIN_GAME = "join_game"

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

    GET_SCORES = "get_scores"
    SCORES_LIST = "scores_list"

    LOGIN = "login"
    REGISTER = "register"
    USER_LOGGED_IN = "user_logged_in"

    GET_RACK = "get_rack"
    SWAP_TILE = "swap_tile"
    GET_TILES_LEFT = "get_tiles_left"
    GET_HISTORY = "get_history"