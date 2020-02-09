import { combineReducers } from 'redux'; 

import AddToMyFridgeReducer from './AddToMyFridgeReducer';
import RecipeReducers from './RecipeReducers';

const combineMyReducers = combineReducers({
    addToMyFridgeReducer: AddToMyFridgeReducer, 
    recipeReducers: RecipeReducers
}); 

export default combineMyReducers; 