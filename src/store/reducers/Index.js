import { combineReducers } from 'redux'; 

import AddToMyFridgeReducer from './AddToMyFridgeReducer';
import RecipeReducer from './RecipeReducer';

const reducers = combineReducers({
    addToMyFridgeReducer: AddToMyFridgeReducer, 
    recipeReducer: RecipeReducer
}); 

export default reducers; 