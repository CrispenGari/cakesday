import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/SignIn.module.css";
interface Props {}
const SignIn: React.FC<Props> = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className={styles.signin}>
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username or email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <p>Error</p>
        <Link href={"/auth/forgot-password"}>Forgot Password?</Link>
        <Button>Sign In</Button>
        <div>
          <span></span>
          <h1>New to Cakesday?</h1>
          <span></span>
        </div>
        <Button onClick={() => router.push("/auth/signup")}>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignIn;
