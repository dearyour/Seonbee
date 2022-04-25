import React, { useCallback, useState } from "react";

// type Props = { props: any; promotion: any };

const Signup = () => {
  const [promotion, setPromotion] = useState(false);
  return (
    <div
      className={
        promotion === true
          ? ["form signupForm", "action"].join(" ")
          : "form signupForm"
      }
    >
      <form>
        <h3>호패 등록</h3>
        <input type="text" name="" placeholder="이메일" />
        <input type="text" name="" placeholder="그대의 이름" />
        <input type="password" name="" placeholder="비밀번호" />
        <input type="password" name="" placeholder="비밀번호 확인" />
        <div
          className="toggle-promotion"
          onClick={() => setPromotion((prevCheck) => !prevCheck)}
        >
          추가정보 입력
        </div>
        <div className="promotion_wrapper">
          {promotion && (
            <div className="promotion">
              <input type="text" name="" placeholder="선호 선물" />
              <input type="text" name="" placeholder="싫은 선물" />
              <input type="text" name="" placeholder="성별" />
              <input type="text" name="" placeholder="생일" />
              <input type="text" name="" placeholder="관심사" />
              <input type="text" name="" placeholder="MBTI" />
            </div>
          )}
        </div>
        <input type="submit" name="" value="등록" />
      </form>
    </div>
  );
};

export default Signup;
