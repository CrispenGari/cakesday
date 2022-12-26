import { Button, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();
interface Props {}
const Welcome: React.FC<Props> = () => {
  const navigate = useNavigate();
  console.log(document.cookie);
  console.log({ cookies });

  return (
    <div className="welcome">
      <div className="welcome__main">
        <div className="welcome__main__left">
          <Image src="/main-logo.png" alt="main-logo" />
          <h1>CakeDays</h1>
          <p>
            Welcome to our application where you get to celebrate your birthdays
            with your loved fiends and family.
          </p>
        </div>
        <div className="welcome__main__right">
          <Image src="/main-logo.png" alt="main-logo" />
          <h1 className="welcome__main__right__h1">CakeDays</h1>
          <p>
            Welcome to our application where you get to celebrate your birthdays
            with your loved fiends and family.
          </p>
          <h1 className="welcome__main__right__h2">Getting Started</h1>
          <div className="welcome__main__right__top">
            <div>
              <span></span>
              <h2>Already Have an Account?</h2> <span></span>
            </div>

            <Button
              colorScheme="blue"
              onClick={() => navigate("/auth/signin", { replace: true })}
            >
              Sign In
            </Button>
          </div>

          <div className="welcome__main__right__bottom">
            <div>
              <span></span>
              <h2>New to Cakesday?</h2> <span></span>
            </div>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={() => navigate("/auth/signup", { replace: true })}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
