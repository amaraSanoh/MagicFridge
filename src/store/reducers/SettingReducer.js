const initialState = { settingInformations: { removeInShoppList: false, addInShoppList: false} }

function changeSettings(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'UPDATE_CHECKBOXES_INFORMATION':
        nextState = {
            ...state, 
            settingInformations: action.value 
        }
      return nextState || state
    case 'CLEAR_DATA_SETTING':
        nextState = {
            ...state, 
            settingInformations: { removeInShoppList: false, addInShoppList: false} 
        }
      return nextState || state
    default:
      return state
  }
}

export default changeSettings;