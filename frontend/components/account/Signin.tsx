import React from "react";

type Props = {};

const Signin = (props: Props) => {
  return (
    <div className="form signinForm">
      <form>
        <h3>납시오</h3>
        <input type="text" name="" placeholder="이메일" />
        <input type="password" name="" placeholder="비밀번호" />
        <input type="submit" name="" value="Login" />
        <a href="#" className="forgot">
          비밀스러운 번호를 까먹었소?
        </a>
      </form>
    </div>
  );
};

export default Signin;
