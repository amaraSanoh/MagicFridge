const initialState = { ingredientsToMyFridgeObjects: [] }

function saveIngredientToMyFridge(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_INGREDIENT_TO_MY_FRIDGE':
        nextState = {
            ...state, 
            ingredientsToMyFridgeObjects: [...state.ingredientsToMyFridgeObjects, action.value] 
        }
      return nextState || state
    case 'REMOVE_INGREDIENT_TO_MY_FRIDGE':
        nextState = {
            ...state,
            ingredientsToMyFridgeObjects: state.ingredientsToMyFridgeObjects.filter(ingred => ingred.id !== action.value.id)
        };
      return nextState || state
    case 'CLEAR_DATA_FRIDGE':
        nextState = {
          ...state,
          ingredientsToMyFridgeObjects: []
        };
      return nextState || state
    default:
      return state
  }
}

export default saveIngredientToMyFridge;