import { types } from "./actions";

const reducer = (state, action) => {
    switch (action.type) {
        case types.UPDATE_GAMES_LIST:
            return {
                ...state,
                games: action.games,
            };
        default:
            return state;
    }
};

export default reducer;
