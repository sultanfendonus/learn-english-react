import {defaultLocale, localeOptions} from '../constants/defaultValues'

import {
    CHANGE_LOCALE,
    SET_WORD_MODAL_VISIBILITY
} from '../actions/actions';

const INIT_STATE = {
    locale: (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale,
    wordModalVisibility: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case CHANGE_LOCALE:
            return {...state, locale: action.payload};

        case SET_WORD_MODAL_VISIBILITY:
            return {...state, wordModalVisibility: action.payload};

        default:
            return {...state};
    }
}
