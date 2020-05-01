import {combineReducers} from 'redux';
import AuthReducers from './AuthReducers';
import SettingReducers from "./SettingReducers";
import MenuReducers from "./MenuReducers";
import WordReducers from "./WordReducers";

export default combineReducers({
    AuthReducers: AuthReducers,
    SettingReducers: SettingReducers,
    MenuReducers: MenuReducers,
    WordReducers: WordReducers

})
