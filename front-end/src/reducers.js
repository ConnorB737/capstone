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
        default:
            return state;
    }
};

export default reducer;
