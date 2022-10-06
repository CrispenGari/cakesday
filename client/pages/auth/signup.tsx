import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/SignUp.module.css";
interface Props {}
const SignUp: React.FC<Props> = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.replace("/auth/confirm-email");
  };
  return (
    <div className={styles.signup}>
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <input
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
          type="password"
          placeholder="confirm password"
        />
        <p>Error</p>
        <Button type="submit">Sign Up</Button>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
      </form>
    </div>
  );
};

export default SignUp;
