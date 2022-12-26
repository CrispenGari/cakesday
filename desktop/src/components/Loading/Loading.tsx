import React from "react";
import "./Loading.css";
interface Props {}
const Loading: React.FC<Props> = () => {
  return (
    <div className="loading">
      <div></div>
    </div>
  );
};

export default Loading;
