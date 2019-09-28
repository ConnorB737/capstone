import {buildLoginMessage, buildPlaceWordMessage, buildRegisterMessage, socketEvents} from "./Api";
import { push } from 'connected-react-router'

export const types = {
    SOCKET: 'socket',
    UPDATE_GAMES_LIST: 'update_games_list',
	UPDATE_BOARD: "update_board",
    PLACE_TILE: "place_tile",
    UPDATE_SCORES: "update_scores",
    LOGOUT: "logout",
    REGISTER: "register",
    USER_LOGGED_IN: "user_logged_in",
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

export const getScores = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_SCORES);
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
        serverBoard: data,
    }
};


export const updateScores = (data) => {
    return {
        type: types.UPDATE_SCORES,
        scores: data,
    }
};


export const wordAccepted = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_BOARD);
        socket.emit(socketEvents.GET_SCORES);
    }
};

export const placeWord = (socket, word, direction, startingPosition) => {
    return (dispatch) => {
        socket.emit(socketEvents.PLACE_WORD, buildPlaceWordMessage(word, direction, startingPosition))
    }
};

export const placeTile = (data) => {
    return {
        type: types.PLACE_TILE,
        ...data,
    }
};

export const redirectTo = (path) => {
    return dispatch => {
        dispatch(push(path))
    };
};

export const logout = () => {
    return {
        type: types.LOGOUT,
    }
};

export const login = (socket, email, password) => {
    return dispatch => {
        socket.emit(socketEvents.LOGIN, buildLoginMessage(email, password));
    }
};

export const register = (socket, email, password) => {
    return dispatch => {
        socket.emit(socketEvents.REGISTER, buildRegisterMessage(email, password));
    }
};

export const userLoggedIn = (data) => {
    return dispatch => {
        dispatch({
            type: types.USER_LOGGED_IN,
            user: data,
        });
        dispatch(push("/dashboard"));
    };
};
