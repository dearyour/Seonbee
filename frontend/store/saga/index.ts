import { all, call } from "redux-saga/effects";
import MemberSaga from "./Member.saga";

function* rootSaga() {
  yield all([call(MemberSaga)]);
}
export default rootSaga;
