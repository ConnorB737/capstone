import { types } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case types.UPDATE_GAMES_LIST:
            return {
                ...state,
                games: action.games,
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
        default:
            return state;
    }
};

export default reducer;
