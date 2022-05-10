import React from "react";
// import './styles.css';
import Image from "next/image";
import Empty from "public/gif/empty.gif";
const EmptyView = () => (
  <div className="emptyView-wrap">
    <Image src={Empty} alt="Image" width={600} height={600} />
  </div>
);

export default EmptyView;
