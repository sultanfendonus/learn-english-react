import getPost from '../api/MainApi'
export * from "./AuthActions"

export * from "./SettingActions"

export * from "./MenuActions"
export * from "./WordActions"
export * from "./HistoryActions"
export * from "./FeedbackActions"

export const getAllPost = () =>async (dispatch) =>{
    try {
        const response = await getPost.get('/posts');
        dispatch({type : "ALL_POST",payload: response.data});
    } catch (error) {
        console.log(error);
    }

}
