import { actionTypes } from '../constants/actionType';

// const imgStore = (data: any) => (
//   
//   type: actionTypes.STOREIMAGE,
//   payload: data,
// });


export const getImageList = (img: any) => {
  console.info(img, 'fetimage');
  // eslint-disable-next-line no-unused-vars
  return function (dispatch: (arg0: { type: string; payload: any; }) => void) {
    // console.log("0000000000000djvjsdv");
    dispatch({type:actionTypes.STOREIMAGE,payload:img})
    // console.info(action.payload)
  };
};