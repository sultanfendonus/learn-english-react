import {combineReducers} from 'redux';
import AuthReducers from './AuthReducers';
import SettingReducers from "./SettingReducers";
import MenuReducers from "./MenuReducers";

export default combineReducers({
    AuthReducers: AuthReducers,
    SettingReducers: SettingReducers,
    MenuReducers: MenuReducers

})
