import { updateGamesList } from "./actions";
import { updateBoard } from "./actions";

export const socketEvents = {
    GET_GAMES: 'get_games',
    GET_BOARD: 'get_board',
    GAMES_LIST: 'games_list',
    PLACE_WORD: 'place_word',
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


export const dispatchFromSocket = (store) => {
    store.getState().socket.on(socketEvents.GAMES_LIST, handleGamesList(store.dispatch));
	
	store.getState().socket.on(socketEvents.GET_BOARD, handleServerBoard(store.dispatch));
};


export const buildPlaceWordMessage = (word, direction, startingPosition) => {
    return {
        word,
        direction,
        startingPosition,
    }
};
