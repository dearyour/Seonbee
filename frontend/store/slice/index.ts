import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";


// 루트 리듀서
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({})(
    state,
    action
  );
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
