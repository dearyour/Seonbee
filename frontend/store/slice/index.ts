import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import member from 'store/slice/member';
import chatbot from 'store/slice/chatbot';

// 루트 리듀서
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({ member, chatbot })(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
