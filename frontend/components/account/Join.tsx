import React, { useCallback, useEffect, useRef, useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
const Join: any = () => {
  const [Bxactive, setBxActive] = useState("");
  // const [promotion, setPromotion] = useState(false);
  // const [bodyactive, setBodyActive] = useState("");
  const __signUpBtn = () => {
    setBxActive("active");
  };
  const __signInBtn = () => {
    setBxActive("");
  };

  // const __promotion = () => {
  //   setPromotion((promotion) => !promotion);
  // };

  // console.log(
  //   Bxactive.length !== 0 ? ["account", Bxactive].join(" ") : "account"
  // );
  return (
    <div
      className={
        Bxactive.length !== 0 ? ["account", Bxactive].join(" ") : "account"
      }
    >
      <div className="containers">
        <div className="blueBg">
          <div className="box signin">
            <h2>Login</h2>
            <button
              className="signinBtn"
              onClick={() => {
                __signInBtn();
              }}
            >
              로그인
            </button>
          </div>
          <div className="box signup">
            <h2>Sign up</h2>
            <button
              className="signupBtn"
              onClick={() => {
                __signUpBtn();
              }}
            >
              회원가입
            </button>
          </div>
        </div>
        <div
          className={
            Bxactive.length !== 0 ? ["formBx", Bxactive].join(" ") : "formBx"
          }
        >
          <Signin></Signin>
          {/* <div className="form signinForm">
            <form>
              <h3>Sign In</h3>
              <input type="text" name="" placeholder="Username" />
              <input type="password" name="" placeholder="Password" />
              <input type="submit" name="" value="Login" />
              <a href="#" className="forgot">
                Forgot Password
              </a>
            </form>
          </div> */}
          <Signup></Signup>
          {/* <div className="form signupForm">
            <form>
              <h3>Sign Up</h3>
              <input type="text" name="" placeholder="Username" />
              <input type="text" name="" placeholder="Email Address" />
              <input type="password" name="" placeholder="Password" />
              <input type="password" name="" placeholder="Confirm Password" />
              <input type="submit" name="" value="Register" />
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Join;
