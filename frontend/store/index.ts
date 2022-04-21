import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware, { Task } from 'redux-saga';
import { Store } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import rootSaga from 'store/saga'
import rootReducer from 'store/slice'


interface SagaStore extends Store {
  sagaTask?: Task;
}
const devMode = process.env.NODE_ENV === 'development';

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // async Saga를 위해 resolve, reject를 반환해서 에러가 생기는 이슈로,
        // serializableCheck 미들웨어를 사용안 함
        serializableCheck: false,
      }).concat(sagaMiddleware),
    devTools: devMode,
  });
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;

};

const wrapper = createWrapper(makeStore, {
  // 이 부분이 true면 디버그때 자세한 설명이 나옵니다. (개발할때는 true로)
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;