import {
    SET_TODAYS_HISTORY
} from '../actions/actions';

const INIT_STATE = {
    todaysHistory: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_TODAYS_HISTORY:
            return { ...state, todaysHistory:action.payload};

        default: return { ...state };
    }
}
