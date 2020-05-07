import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_ERROR,
    REGISTER_USER_ERROR,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_ERROR,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_ERROR,
    RESET_ERROR
} from './actions';
import MainApi from "../api/MainApi";

export const loginUser = (user, history) => async (dispatch) => {
    try {
        const {email, password} = user;

        const response = await MainApi.post('/user/sign-in', user)
        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            dispatch({type : LOGIN_USER_SUCCESS ,payload: response.data});
            window.location.href = "/"
        }
    } catch (error) {
        error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const registerUser = (user, history) => async (dispatch) => {
    try {
        const response = await MainApi.post('/user/sign-up', user)
        if(response.status === 201){
            localStorage.setItem('token', response.data.token);
            dispatch({type : REGISTER_USER_SUCCESS ,payload: response.data});
            window.location.href = "/"
        }
    } catch (error) {
        error.response && dispatch({type : REGISTER_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        localStorage.removeItem('token')
        window.location.href = '/'
    } catch (error) {
        console.log(error);
    }
}

export const resetError = () => ({
    type: RESET_ERROR,
    payload: null
});

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});
export const loginUserError = (message) => ({
    type: LOGIN_USER_ERROR,
    payload: {message}
});

export const forgotPassword = (forgotUserMail, history) => ({
    type: FORGOT_PASSWORD,
    payload: {forgotUserMail, history}
});
export const forgotPasswordSuccess = (forgotUserMail) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: forgotUserMail
});
export const forgotPasswordError = (message) => ({
    type: FORGOT_PASSWORD_ERROR,
    payload: {message}
});

export const resetPassword = ({resetPasswordCode, newPassword, history}) => ({
    type: RESET_PASSWORD,
    payload: {resetPasswordCode, newPassword, history}
});
export const resetPasswordSuccess = (newPassword) => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: newPassword
});
export const resetPasswordError = (message) => ({
    type: RESET_PASSWORD_ERROR,
    payload: {message}
});


// export const registerUser = (user, history) => ({
//     type: REGISTER_USER,
//     payload: {user, history}
// })
export const registerUserSuccess = (user) => ({
    type: REGISTER_USER_SUCCESS,
    payload: user
})
export const registerUserError = (message) => ({
    type: REGISTER_USER_ERROR,
    payload: {message}
})
//
// export const logoutUser = (history) => ({
//     type: LOGOUT_USER,
//     payload: {history}
// });
