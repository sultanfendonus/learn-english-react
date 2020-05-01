import {
    SINGLE_WORD
} from '../actions/actions';

const INIT_STATE = {
    word: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SINGLE_WORD:
            return { ...state, word:action.payload};

        default: return { ...state };
    }
}
