import {
    CHANGE_LOCALE,
    SET_WORD_MODAL_VISIBILITY
} from './actions';


export const changeLocale = (locale) => {
    localStorage.setItem('currentLanguage', locale);
    return (
        {
            type: CHANGE_LOCALE,
            payload: locale
        }
    )
}

export const setWordViewModalVisibility = (data) =>{
    return({
        type: SET_WORD_MODAL_VISIBILITY,
        payload: data
    })
}
