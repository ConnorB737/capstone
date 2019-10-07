import {
    updateGamesList,
    updateBoard,
    wordAccepted,
    updateScores,
    userLoggedIn,
    updateRack,
    getGames,
    updateTilesLeft,
    updateHistory,
    updateRoundStatus,
    getRack, getScores, getEverything,
    updatePlayersLeft
} from "./actions";

export const socketEvents = {
    GET_GAMES: 'get_games',
    GET_BOARD: 'get_board',
    GET_SCORES: 'get_scores',
    GAMES_LIST: 'games_list',
    PLACE_WORD: 'place_word',
    WORD_ACCEPTED: 'word_accepted',
    SCORES_LIST: 'scores_list',
    LOGIN: 'login',
    REGISTER: 'register',
    USER_LOGGED_IN: 'user_logged_in',
    GET_RACK: 'get_rack',
    SWAP_TILE: "swap_tile",
    JOIN_GAME: "join_game",
    GAMES_UPDATED: "games_updated",
    GET_TILES_LEFT: "get_tiles_left",
    GET_HISTORY: "get_history",
    GET_ROUND_STATUS: "get_round_status",
    GET_PLAYERS_LEFT: "get_players_left",
    ROUND_STATUS: "round_status",
    CREATE_GAME: "create_game",
};


const handleGamesList = (dispatch) => {
    return data => {
        dispatch(updateGamesList(JSON.parse(data)));
    }
};

const handleServerBoard = (dispatch) => {
    return data => {
        dispatch(updateBoard(JSON.parse(data)));
    }
};


const handleScoresList = (dispatch) => {
    return data => {
        dispatch(updateScores(JSON.parse(data)));
    }
};


const handleWordAccepted = (dispatch, socket) => {
    return () => {
        dispatch(wordAccepted(socket))
    }
};


const handleUserLoggedIn = (dispatch) => {
    return data => {
        dispatch(userLoggedIn(JSON.parse(data)));
    }
};


const handleGetRack = (dispatch) => {
    return data => {
        dispatch(updateRack(JSON.parse(data)));
    };
};

const handleGetTilesLeft = (dispatch) => {
    return data => {
        dispatch(updateTilesLeft(JSON.parse(data)));
    };
};

const handleGetHistory = (dispatch) => {
    return data => {
        dispatch(updateHistory(JSON.parse(data)));
    };
};


const handleGamesUpdated = (dispatch, socket) => {
    return () => {
        dispatch(getEverything(socket));
    };
};


const handleRoundStatus = (dispatch) => {
    return data => {
        dispatch(updateRoundStatus(JSON.parse(data)));
    };
};

const handlePlayersLeft = (dispatch) => {
    return data => {
        dispatch(updatePlayersLeft(JSON.parse(data)));
    };
};


export const dispatchFromSocket = (store) => {
    store.getState().main.socket.on(socketEvents.GAMES_LIST, handleGamesList(store.dispatch));
	
	store.getState().main.socket.on(socketEvents.GET_BOARD, handleServerBoard(store.dispatch));

	store.getState().main.socket.on(socketEvents.WORD_ACCEPTED, handleWordAccepted(store.dispatch, store.getState().main.socket));

	store.getState().main.socket.on(socketEvents.SCORES_LIST, handleScoresList(store.dispatch));

	store.getState().main.socket.on(socketEvents.USER_LOGGED_IN, handleUserLoggedIn(store.dispatch));

	store.getState().main.socket.on(socketEvents.SCORES_LIST, handleScoresList(store.dispatch));

	store.getState().main.socket.on(socketEvents.GET_RACK, handleGetRack(store.dispatch));

	store.getState().main.socket.on(socketEvents.GAMES_UPDATED, handleGamesUpdated(store.dispatch, store.getState().main.socket));
    
    store.getState().main.socket.on(socketEvents.GET_TILES_LEFT, handleGetTilesLeft(store.dispatch));

    store.getState().main.socket.on(socketEvents.GET_HISTORY, handleGetHistory(store.dispatch));

    store.getState().main.socket.on(socketEvents.ROUND_STATUS, handleRoundStatus(store.dispatch));
    
    store.getState().main.socket.on(socketEvents.GET_PLAYERS_LEFT, handlePlayersLeft(store.dispatch));
};


export const buildPlaceWordMessage = (word, direction, startingPosition, temp_rack) => {
    return {
        word,
        direction,
        startingPosition,
        temp_rack,
    }
};

export const buildLoginMessage = (email, password) => {
    return {
        email,
        password,
    }
};

export const buildRegisterMessage = (email, password) => {
    return {
        email,
        password,
    }
};

export const buildJoinGameMessage = (gameId) => {
    return {
        'game_id': gameId,
    }
};
