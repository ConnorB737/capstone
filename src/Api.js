import { updateGamesList, updateBoard, wordAccepted, updateScores } from "./actions";

export const socketEvents = {
    GET_GAMES: 'get_games',
    GET_BOARD: 'get_board',
    GET_SCORES: 'get_scores',
    GAMES_LIST: 'games_list',
    PLACE_WORD: 'place_word',
    WORD_ACCEPTED: 'word_accepted',
    SCORES_LIST: 'scores_list',
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


export const dispatchFromSocket = (store) => {
    store.getState().socket.on(socketEvents.GAMES_LIST, handleGamesList(store.dispatch));
	
	store.getState().socket.on(socketEvents.GET_BOARD, handleServerBoard(store.dispatch));

	store.getState().socket.on(socketEvents.WORD_ACCEPTED, handleWordAccepted(store.dispatch, store.getState().socket));

	store.getState().socket.on(socketEvents.SCORES_LIST, handleScoresList(store.dispatch));
};


export const buildPlaceWordMessage = (word, direction, startingPosition) => {
    return {
        word,
        direction,
        startingPosition,
    }
};
