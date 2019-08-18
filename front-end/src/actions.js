import {socketEvents} from "./Api";

export const types = {
    SOCKET: 'socket',
    UPDATE_GAMES_LIST: 'update_games_list',
};


export const getGames = (socket) => {
    return dispatch => {
        socket.emit(socketEvents.GET_GAMES);
    };
};

export const updateGamesList = (data) => {
    return {
        type: types.UPDATE_GAMES_LIST,
        games: data.games,
    }
};
