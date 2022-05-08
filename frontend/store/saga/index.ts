import { all, call } from "redux-saga/effects";
import MemberSaga from "./Member.saga";
import ProfileSaga from "./Profile.saga";

function* rootSaga() {
  yield all([call(MemberSaga), call(ProfileSaga)]);
}
export default rootSaga;
