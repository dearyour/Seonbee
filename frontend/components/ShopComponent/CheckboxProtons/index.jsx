import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  root: {
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
  wrap: {
    width: "100%",
    display: "flex",
    // flexDirection: "row-reverse",
    // flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
    marginLeft: 0,
  },
  label: {
    fontSize: ".8rem",
    fontFamily: `'Raleway', sans-serif`,
  },
});

const CheckboxProton = ({ changeCheckedd, cuisined }) => {
  const classes = useStyles();
  const { checked, label, id } = cuisined;
  return (
    <div>
      <FormControlLabel
        classes={{
          label: classes.label,
          root: classes.wrap,
        }}
        control={
          <Checkbox
            classes={{
              checked: classes.checked,
              root: classes.root,
            }}
            size="small"
            checked={checked}
            onChange={() => changeCheckedd(id)}
            inputProps={{ "aria-label": "checkbox with small size" }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxProton;
