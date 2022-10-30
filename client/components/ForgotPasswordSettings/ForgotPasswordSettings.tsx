import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import styles from "./ForgotPasswordSettings.module.css";
interface Props {}
const ForgotPasswordSettings: React.FC<Props> = ({}) => {
  const [email, setEmail] = useState("");
  return (
    <div className={styles.forgot__password__settings}>
      <h1>Forgot Password</h1>
      <form>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineMailOutline color="gray" />}
          />
          <Input
            // isInvalid={data?.signUp.error?.field === "email"}
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </InputGroup>
        <Button type="submit">Request Forgot Password Link</Button>
      </form>
      <p>The password reset link will be sent to this email.</p>
    </div>
  );
};

export default ForgotPasswordSettings;
