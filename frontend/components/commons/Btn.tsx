import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type BtnProps = {
  isDisabled?: boolean;
  children?: any;
  onClick?: Function;
  filled?: boolean;
  className?: string;
};

function Btn({
  isDisabled = false,
  children = "",
  className,
  onClick = () => console.warn("클릭 이벤트가 지정되지 않음"),
  filled = false,
}: BtnProps) {
  const mainColor = isDisabled ? "#9fa5a8" : filled ? "#FF6464" : "#FFFFFF";
  const effectColor = isDisabled ? "#9A9898" : filled ? "#BB4545" : "#FF6464";
  const fontColor = !filled ? "#FF6464" : "white";
  const effectFontColor = filled ? "white" : "#F2FFFF";

  const CustomBtn = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: "1rem",
    padding: "3px 10px",
    // lineHeight: 1.5,
    color: fontColor,
    borderRadius: 30,
    backgroundColor: mainColor,
    border: "2px solid " + mainColor,
    fontFamily: "Pretendard",
    "&:hover": {
      backgroundColor: effectColor,
      borderColor: effectColor,
      boxShadow: "none",
      color: effectFontColor,
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: effectColor,
      borderColor: effectColor,
      color: effectFontColor,
    },
  });

  return (
    <CustomBtn
      className={className}
      variant="contained"
      onClick={() => onClick()}
    >
      {children}
    </CustomBtn>
  );
}

export default Btn;
