import { Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Footer } from "../components";
import styles from "../styles/NotFound.module.css";
interface Props {}
const NotFound: React.FC<Props> = ({}) => {
  return (
    <div className={styles.not__found}>
      <div className={styles.not__found__main}>
        <div>
          <Image src="/main-logo.png" alt="main-logo" />
          <h1>Page Not Found.</h1>
          <Link href={"/"}>Cakesday</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
