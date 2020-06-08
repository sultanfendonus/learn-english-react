import {
    SINGLE_WORD,
    DETAILS_WORD,
    SET_SINGLE_WORD_EMPTY,
    SET_WORD_SEARCH_RESULT
} from '../actions/actions';

const INIT_STATE = {
    word: null,
    detailsWord: null,
    wordSearchResult: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SINGLE_WORD:
            return {...state, word: action.payload};

        case SET_SINGLE_WORD_EMPTY:
            return {...state, word: action.payload};

        case DETAILS_WORD:
            return {...state, detailsWord: action.payload};


        case SET_WORD_SEARCH_RESULT:
            return {...state, wordSearchResult: action.payload};

        default:
            return {...state};
    }
}
