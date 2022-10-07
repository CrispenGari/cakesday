import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/ConfirmEmail.module.css";
interface Props {}

const ConfirmEmail: React.FC<Props> = ({}) => {
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace("/auth/more-info");
  };
  return (
    <div className={styles.confirm__email}>
      <form onSubmit={onSubmit}>
        <h1>Confirm Email</h1>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          placeholder="000-000"
        />
        <p>Error</p>
        <Link href={"/auth/forgot-password"}>Did not receive the code?</Link>
        <Button type="submit">Confirm</Button>
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

export default ConfirmEmail;
