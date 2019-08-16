import { updateGamesList } from "./actions";

export const socketEvents = {
    GET_GAMES: 'get_games',
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
