import getPost from '../api/MainApi'
export * from "./AuthActions"

export {changeLocale} from "./SettingActions"

export * from "./MenuActions"

export const getAllPost = () =>async (dispatch) =>{
    try {
        const response = await getPost.get('/posts');
        dispatch({type : "ALL_POST",payload: response.data});
    } catch (error) {
        console.log(error);
    }

}
