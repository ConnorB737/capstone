import { updateGamesList } from "./actions";

export const socketEvents = {
    GET_GAMES: 'get_games',
    GET_BOARD: 'get_board',
    GAMES_LIST: 'games_list',
};


const handleGamesList = (dispatch) => {
    return data => {
        dispatch(updateGamesList(JSON.parse(data)));
    }
};


export const dispatchFromSocket = (store) => {
    store.getState().socket.on(socketEvents.GAMES_LIST, handleGamesList(store.dispatch));
};
