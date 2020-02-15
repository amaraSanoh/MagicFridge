import { combineReducers } from 'redux'; 

import AddToMyFridgeReducer from './AddToMyFridgeReducer';
import RecipeReducer from './RecipeReducer';
import MyListReducer from './MyListReducer';

const reducers = combineReducers({
    addToMyFridgeReducer: AddToMyFridgeReducer, 
    recipeReducer: RecipeReducer, 
    myListReducer: MyListReducer
}); 

export default reducers; 