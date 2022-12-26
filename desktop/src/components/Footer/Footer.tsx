import React from "react";
import "./Footer.css";
interface Props {}
const Footer: React.FC<Props> = () => {
  return (
    <div className={"footer"}>
      <p>
        Copyright © {new Date().getFullYear()} Cakesday Inc. All rights
        reserved.
      </p>
    </div>
  );
};

export default Footer;
