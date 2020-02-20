const initialState = { settingInformations: [ {removeInShoppList: false}, {addInShoppList: false} ] }

function changeSettings(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'CHANGE_REMOVE_IN_SHOPP_LIST':
        nextState = {
            ...state, 
            settingInformations: action.value 
        }
      return nextState || state
    case 'CHANGE_ADD_IN_SHOPP_LIST':
            nextState = {
                ...state,
                settingInformations: action.value 
            };
      return nextState || state
    default:
      return state
  }
}

export default changeSettings;