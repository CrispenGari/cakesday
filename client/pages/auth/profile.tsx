import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/Profile.module.css";
interface Props {}

const Profile: React.FC<Props> = ({}) => {
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.replace("/");
  };
  return (
    <div className={styles.profile}>
      <form onSubmit={onSubmit}>
        <h1>Profile</h1>
        {/* profile picture */}
        {/* Banner */}
        <Button type="submit">Next</Button>
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

export default Profile;
