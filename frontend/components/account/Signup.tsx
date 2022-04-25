import React from "react";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="form signupForm">
      <form>
        <h3>호패 등록</h3>
        <input type="text" name="" placeholder="이메일" />
        <input type="text" name="" placeholder="그대의 이름" />
        <input type="password" name="" placeholder="비밀번호" />
        <input type="password" name="" placeholder="비밀번호 확인" />
        <input type="submit" name="" value="Register" />
      </form>
    </div>
  );
};

export default Signup;
