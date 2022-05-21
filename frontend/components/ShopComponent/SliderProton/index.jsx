import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styled from "@emotion/styled";
const VV = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  thumb: {
    color: "#000",
  },
  rail: {
    color: `rgba(0, 0, 0, 0.26)`,
  },
  track: {
    color: "#000",
  },
});

const SliderProton = ({ value, changePrice }) => {
  const classes = useStyles();

  return (
    <>
      <VV>
        <div>
          최저 가격 <br />
          [&nbsp;
          {value[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;
          원&nbsp;]
        </div>
        <div>
          최대 가격 <br />
          [&nbsp;
          {value[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp;
          원&nbsp;]
        </div>
      </VV>
      <div className={classes.root}>
        <Slider
          value={value}
          onChange={changePrice}
          valueLabelDisplay="off"
          min={100}
          max={1000000}
          classes={{
            thumb: classes.thumb,
            rail: classes.rail,
            track: classes.track,
          }}
        />
      </div>
    </>
  );
};

export default SliderProton;
