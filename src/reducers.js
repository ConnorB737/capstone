import { types } from "./actions";
import {combineReducers} from "redux";
import { connectRouter } from 'connected-react-router';

const mainReducer = (state, action) => {
    switch (action.type) {
        case types.UPDATE_GAMES_LIST:
            return {
                ...state,
                openGames: action.openGames,
                readyGame: action.readyGame,
            };
		case types.UPDATE_BOARD:
			return {
				...state,
				serverBoard: action.serverBoard,
			};
        case types.PLACE_TILE:
            const newServerBoard = state.serverBoard;
            newServerBoard[action.y][action.x] = action.value;
            return {
                ...state,
                serverBoard: newServerBoard,
            };
        case types.UPDATE_SCORES:
            return {
                ...state,
                scores: action.scores,
            };
        case types.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case types.USER_LOGGED_IN:
            return {
                ...state,
                user: action.user,
            };
        case types.UPDATE_RACK:
            return {
                ...state,
                rack: action.rack,
            };
        case types.UPDATE_TILES_LEFT:
            return {
                ...state,
                tiles_left: action.tiles_left,
            };
        case types.UPDATE_HISTORY:
            return {
                ...state,
                history: action.history,
            };
        case types.UPDATE_ROUND_STATUS:
            return {
                ...state,
                roundStatus: action.roundStatus,
            };
        case types.UPDATE_PLAYERS_LEFT:
            return{
                ...state,
                playersLeft: action.playersLeft,
                playersNeeded: action.playersNeeded,
                playersInGame: action.playersInGame,
            };
        default:
            return state || null;
    }
};

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    main: mainReducer,
});

export default createRootReducer;
