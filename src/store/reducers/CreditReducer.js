import { UPDATE_CREDIT, totalCreditPerDay } from '../../constants/CreditConstant';

const initialState = { credit: { creditRemaining: totalCreditPerDay, lastUpdate: "" } }

function updateCredit(state = initialState, action) {
  let nextState
  switch (action.type) {
    case UPDATE_CREDIT:
        nextState = {
            ...state, 
            credit: action.value 
        }
      return nextState || state
    default:
      return state
  }
}

export default updateCredit;