import {
    SINGLE_WORD,
    DETAILS_WORD
} from '../actions/actions';

const INIT_STATE = {
    word: null,
    detailsWord: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SINGLE_WORD:
            return {...state, word: action.payload};

        case DETAILS_WORD:
            return {...state, detailsWord: action.payload};

        default:
            return {...state};
    }
}
