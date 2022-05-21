import React from "react";

const ControlMenu = React.memo(({ value, onChange, optionList }: any) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it: any, idx: number) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});
ControlMenu.displayName = "ControlMenu";

export default ControlMenu;
