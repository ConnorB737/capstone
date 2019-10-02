import {
    buildJoinGameMessage,
    buildLoginMessage,
    buildPlaceWordMessage,
    buildRegisterMessage,
    socketEvents
} from "./Api";
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
    UPDATE_RACK: "update_rack"
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

export const getRack = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_RACK);
    };
};

export const updateGamesList = (data) => {
    return {
        type: types.UPDATE_GAMES_LIST,
        ...data,
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

export const updateRack = (data) => {
    return {
        type: types.UPDATE_RACK,
        rack: data,
    }
};

export const swapTile = (socket, tile) => {
    return dispatch => {
        socket.emit(socketEvents.SWAP_TILE, {"tiles": tile});
    }
};

export const wordAccepted = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_BOARD);
        socket.emit(socketEvents.GET_SCORES);
    }
};

export const placeWord = (socket, word, direction, startingPosition, temp_rack) => {
    return (dispatch) => {
        socket.emit(socketEvents.PLACE_WORD, buildPlaceWordMessage(word, direction, startingPosition, temp_rack))
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
    return dispatch => {
        dispatch({
            type: types.LOGOUT,
        });
        dispatch(push("/login"))
    };
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

export const joinGame = (socket, gameId) => {
    return dispatch => {
        socket.emit(socketEvents.JOIN_GAME, buildJoinGameMessage(gameId));
        dispatch(push(`/game/${gameId}`));
    };
};
