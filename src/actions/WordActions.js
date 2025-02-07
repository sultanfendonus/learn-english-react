import MainApi from "../api/MainApi";
import {
    DETAILS_WORD,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS, SINGLE_WORD, SET_SINGLE_WORD_EMPTY,
    REORDER_TODAY_HISTORY,
    SET_WORD_SEARCH_RESULT,
    SET_WORD_AS_PICKED
} from "./actions";

export const getASingleWord = () => async (dispatch) => {
    try {
        dispatch({type: SET_SINGLE_WORD_EMPTY, payload: null})
        const response = await MainApi.get('/word/single')
        if (response.status === 200) {
            dispatch({type: SINGLE_WORD, payload: response.data});
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}
export const getASingleWordDetails = (data) => async (dispatch) => {
    // dispatch({type: REORDER_TODAY_HISTORY, payload: data})
    try {
        const response = await MainApi.post('/word/find', data)
        if (response.status === 200) {
            dispatch({type: DETAILS_WORD, payload: response.data});
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const moveFirstElementToBottom = (data) => async (dispatch) => {
    dispatch({type: REORDER_TODAY_HISTORY, payload: data})
}

export const updateASingleWord = (data) => async (dispatch) => {
    try {
        const response = await MainApi.put('/word/update', data)
        if (response.status === 200) {
            console.log("Successfully save")
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const updateASingleWordImages = (data) => async (dispatch) => {
    try {
        const response = await MainApi.put('/word/images', data)
        if (response.status === 200) {
            console.log(">>>Successfully Image updated")
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const searchAWord = (word) => async (dispatch) => {
    try {
        const response = await MainApi.get(`/word/search?q=${word}`)
        if (response.status === 200) {
            dispatch({type: SET_WORD_SEARCH_RESULT, payload: response.data});
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const pickWordFromSearchList = (wordId) => async (dispatch) => {
    dispatch({type: SET_WORD_AS_PICKED, payload: wordId});
}
