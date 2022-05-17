import React from "react";

const ControlMenus = React.memo(({ value, onChange, optionList }: any) => {
  return (
    <select
      className="ControlMenuShop"
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
ControlMenus.displayName = "ControlMenuShop";

export default ControlMenus;
