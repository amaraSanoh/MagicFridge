const initialState = { recipesObjects: [] }

function saveRecipes(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SAVE_RECIPE':
        nextState = {
            ...state, //réécrit le contenu du state
            recipesObjects: [...state.recipesObjects, action.value] 
        }
      return nextState || state
    case 'UNSAVE_RECIPE':
            nextState = {
                ...state,
                recipesObjects: state.recipesObjects.filter(id => id !== action.value.id)
            };
      return nextState || state
    default:
      return state
  }
}

export default saveRecipes;