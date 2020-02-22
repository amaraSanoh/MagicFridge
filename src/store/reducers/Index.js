import { combineReducers } from 'redux'; 

import AddToMyFridgeReducer from './AddToMyFridgeReducer';
import RecipeReducer from './RecipeReducer';
import MyListReducer from './MyListReducer';
import SettingReducer from './SettingReducer';

const reducers = combineReducers({
    addToMyFridgeReducer: AddToMyFridgeReducer, 
    recipeReducer: RecipeReducer, 
    myListReducer: MyListReducer, 
    settingReducer: SettingReducer
}); 

export default reducers; 