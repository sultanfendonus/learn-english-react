import MainApi from "../api/MainApi";

export const pickAWord = (data) => async (dispatch) => {
    try {
        const response = await MainApi.post('/history/new', data)
        if(response.status === 201){
            console.log("Successfully save history")
        }
    } catch (error) {
        // error.response && dispatch({type : LOGIN_USER_ERROR ,payload: {message: error.response.data.errors[0].msg}});
        console.log(error);
    }
}
