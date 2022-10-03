import type { NextPage } from "next";
import { Emoji } from "../components";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.home__left}>
        <h1>CakeDay</h1>
        <p>
          Welcome to our application where you get to celebrate your birthdays
          with your loved fiends and family.
        </p>
      </div>
      <div className={styles.home__right}>
        <h1>Getting Started</h1>
      </div>

      <Emoji symbol="0x1F60D" className={styles.home__emoji} />
    </div>
  );
};

export default Home;
