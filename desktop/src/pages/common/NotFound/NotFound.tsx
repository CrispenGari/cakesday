import { Image } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "../../../components";
import "./NotFound.css";
interface Props {}
const NotFound: React.FC<Props> = () => {
  const location = useLocation();
  console.log({ location });
  return (
    <div className={"not__found"}>
      <div className={"not__found__main"}>
        <div>
          <Image src="/main-logo.png" alt="main-logo" />
          <h1>Page Not Found.</h1>
          <Link to={"/"}>Cakesday</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
