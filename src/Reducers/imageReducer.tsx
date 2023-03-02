import { actionTypes } from '../constants/actionType';
const initialState = {
  imagestore: [],
};
export const imageReducer = (state = initialState, action: { type: any; payload: any; }) => {
  // console.info(action, 'state');
  switch (action.type) {
    case actionTypes.STOREIMAGE:
      console.log(action.payload, 'paload');
      return {
        ...state,
        imagestore: action.payload,
      };
    default:
      return state;
  }
};