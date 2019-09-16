import {buildPlaceWordMessage, socketEvents} from "./Api";

export const types = {
    SOCKET: 'socket',
    UPDATE_GAMES_LIST: 'update_games_list',
	UPDATE_BOARD: "update_board",
};


export const getGames = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_GAMES);
    };
};

export const getBoard = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_BOARD);
    };
};

export const updateGamesList = (data) => {
    return {
        type: types.UPDATE_GAMES_LIST,
        games: data.games,
    }
};


export const updateBoard = (data) => {
    return {
        type: types.UPDATE_BOARD,
        serverBoard: data.serverBoard,
    }
};

export const placeWord = (socket, word, direction, startingPosition) => {
    return (dispatch) => {
        socket.emit(socketEvents.PLACE_WORD, buildPlaceWordMessage(word, direction, startingPosition))
    }
};

