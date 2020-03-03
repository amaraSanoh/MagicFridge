const initialState = { ingredientsToMyListObjects: [] }

function saveIngredientToMyList(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_INGREDIENT_TO_MY_LIST':
        nextState = {
          ...state, 
          ingredientsToMyListObjects: [...state.ingredientsToMyListObjects, action.value] 
        }
      return nextState || state
    case 'REMOVE_INGREDIENT_TO_MY_LIST':
            nextState = {
                ...state,
                ingredientsToMyListObjects: state.ingredientsToMyListObjects.filter(ingred => ingred.id !== action.value.id)
            };
      return nextState || state
    case 'CLEAR_DATA_SHOPP_LIST':
        nextState = {
            ...state,
            ingredientsToMyListObjects: []
        };
        return nextState || state
    default:
      return state
  }
}

export default saveIngredientToMyList;