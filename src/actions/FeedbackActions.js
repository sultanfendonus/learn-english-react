import MainApi from "../api/MainApi";
import {message} from "antd";

export const newFeedback = (data) => async (dispatch) => {
    try {
        const response = await MainApi.post('/feedback/new',data)
        message.success("Your feedback successfully submitted.")
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}