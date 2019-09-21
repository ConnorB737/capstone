import { updateGamesList, updateBoard, wordAccepted } from "./actions";

export const socketEvents = {
    GET_GAMES: 'get_games',
    GET_BOARD: 'get_board',
    GAMES_LIST: 'games_list',
    PLACE_WORD: 'place_word',
    WORD_ACCEPTED: 'word_accepted',
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


const handleWordAccepted = (dispatch, socket) => {
    return () => {
        dispatch(wordAccepted(socket))
    }
};


export const dispatchFromSocket = (store) => {
    store.getState().socket.on(socketEvents.GAMES_LIST, handleGamesList(store.dispatch));
	
	store.getState().socket.on(socketEvents.GET_BOARD, handleServerBoard(store.dispatch));

	store.getState().socket.on(socketEvents.WORD_ACCEPTED, handleWordAccepted(store.dispatch, store.getState().socket));
};


export const buildPlaceWordMessage = (word, direction, startingPosition) => {
    return {
        word,
        direction,
        startingPosition,
    }
};
