import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Emoji, Loading } from "../components";
import { emotions, __server__base__url__ } from "../constants";
import { useHelloWorldQuery, useUserQuery } from "../graphql/generated/graphql";
import { setAccessToken } from "../state";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { loading: l, data } = useUserQuery({
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    setLoading(l);
  }, [l]);
  console.log(data);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.home__left}>
        <h1>CakeDay</h1>
        {emotions.map(({ code, name }) => (
          <Emoji
            symbol={code as any}
            key={name}
            className={styles.home__emoji}
          />
        ))}
        <p>
          Welcome to our application where you get to celebrate your birthdays
          with your loved fiends and family.
        </p>
      </div>
      <div className={styles.home__right}>
        <h1>Getting Started</h1>
        <div className={styles.home__right__top}>
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

        <div className={styles.home__right__bottom}>
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

export default Home;
