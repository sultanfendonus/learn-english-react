import MainApi from "../api/MainApi";
import {LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, SINGLE_WORD} from "./actions";

export const getASingleWord = () => async (dispatch) => {
    try {
        const response = await MainApi.get('/word/single')
        if(response.status === 200){
            dispatch({type : SINGLE_WORD ,payload: response.data});
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const updateASingleWord = (data) => async (dispatch) => {
    try {
        const response = await MainApi.put('/word/update', data)
        if(response.status === 200){
            console.log("Successfully save")
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}
