import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type BtnProps = {
  isDisabled?: boolean;
  children?: any;
  onClick?: Function;
  param?: any;
  filled?: boolean;
  className?: string;
  small?: boolean;
};

function Btn({
  isDisabled = false,
  children = "",
  className,
  onClick = () => console.warn("클릭 이벤트가 지정되지 않음"),
  param = "",
  filled = false,
  small = false,
}: BtnProps) {
  const borderColor = isDisabled ? "#9fa5a8" : filled ? "#FF6464" : "#FF6464";
  const mainColor = isDisabled ? "#9fa5a8" : filled ? "#FF6464" : "#FFFFFF";
  const effectColor = isDisabled ? "#9A9898" : filled ? "#E4345A" : "#FF6464";
  const fontColor = !filled ? "#FF6464" : "white";
  const effectFontColor = filled ? "white" : "#F2FFFF";

  const CustomBtn = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: small ? "0.875rem" : "1rem",
    padding: small ? "2px 10px" : "1px 5px",
    // lineHeight: 1.5,
    color: fontColor,
    borderRadius: 30,
    backgroundColor: mainColor,
    border: "2px solid " + borderColor,
    fontFamily: "Pretendard",
    "&:hover": {
      backgroundColor: effectColor,
      borderColor: effectColor,
      boxShadow: "none",
      color: effectFontColor,
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: mainColor,
      borderColor: borderColor,
      color: effectFontColor,
    },
  });

  return (
    <>
      {param ? (
        <CustomBtn
          className={className}
          variant="contained"
          onClick={() => onClick(param)}
        >
          {children}
        </CustomBtn>
      ) : (
        <CustomBtn
          className={className}
          variant="contained"
          onClick={() => onClick()}
        >
          {children}
        </CustomBtn>
      )}
    </>
  );
}

export default Btn;
