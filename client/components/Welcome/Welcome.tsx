import { Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import styles from "./Welcome.module.css";
import { Emoji } from "@crispengari/react-emojify";
interface Props {}

const emojisId = Array(20)
  .fill(null)
  .map((_, i) => `react@emojify-${i + 1}`);
const Welcome: React.FC<Props> = ({}) => {
  const router = useRouter();
  return (
    <div className={styles.welcome}>
      <div className={styles.welcome__left}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>CakeDays</h1>
        <p>
          Welcome to our application where you get to celebrate your birthdays
          with your loved fiends and family.
        </p>
      </div>
      <div className={styles.welcome__right}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1 className={styles.welcome__right__h1}>CakeDays</h1>
        <p>
          Welcome to our application where you get to celebrate your birthdays
          with your loved fiends and family.
        </p>
        <h1 className={styles.welcome__right__h2}>Getting Started</h1>
        <div className={styles.welcome__right__top}>
          <div>
            <span></span>
            <h2>Already Have an Account?</h2> <span></span>
          </div>

          <Button
            colorScheme="blue"
            onClick={() => router.push("/auth/signin")}
          >
            Sign In
          </Button>
        </div>

        <div className={styles.welcome__right__bottom}>
          <div>
            <span></span>
            <h2>New to Cakesday?</h2> <span></span>
          </div>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={() => router.push("/auth/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
