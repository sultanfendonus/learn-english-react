import MainApi from "../api/MainApi";
import { message } from 'antd';
import {PUSH_TODAY_HISTORY, SET_ALL_HISTORY, SET_TODAYS_HISTORY} from "./actions";

export const pickAWord = (data) => async (dispatch) => {
    try {
        const response = await MainApi.post('/history/new', data)
        if (response.status === 201) {
            dispatch({type: PUSH_TODAY_HISTORY, payload: response.data});
            console.log("Successfully save history")
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        if(error.response){
            if(error.response.status === 429){
                message.error(error.response.data.errors[0].msg);
            }
        }
        console.log(error);
    }
}

export const getTodaysHistory = () => async (dispatch) => {
    try {
        const response = await MainApi.get('/history/today')
        if (response.status === 200) {
            dispatch({type: SET_TODAYS_HISTORY, payload: response.data.data});
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const getAllHistory = () => async (dispatch) => {
    try {
        const response = await MainApi.get('/history/all')
        if (response.status === 200) {
            dispatch({type: SET_ALL_HISTORY, payload: response.data.data});
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const pushHistoryToTodayList = (data) => async (dispatch) => {
    console.log(data)
    dispatch({type: PUSH_TODAY_HISTORY, payload: data});
}
