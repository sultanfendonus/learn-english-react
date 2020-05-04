import {
    SET_TODAYS_HISTORY,
    PUSH_TODAY_HISTORY
} from '../actions/actions';

const INIT_STATE = {
    todaysHistory: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_TODAYS_HISTORY:
            return { ...state, todaysHistory:action.payload};

        case PUSH_TODAY_HISTORY:
            return { ...state, todaysHistory: [...state.todaysHistory, action.payload]};
        default: return { ...state };
    }
}
