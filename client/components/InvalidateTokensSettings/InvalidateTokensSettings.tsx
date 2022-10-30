import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import styles from "./InvalidateTokensSettings.module.css";
interface Props {}
const InvalidateTokensSettings: React.FC<Props> = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [show0, setShow0] = useState<boolean>(false);
  return (
    <div className={styles.invalidate__tokens__settings}>
      <form>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineLockClosed color="gray" />}
          />
          <Input
            // isInvalid={data?.signUp.error?.field === "password"}
            type={show0 ? "text" : "password"}
            placeholder="current account password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <InputRightElement>
            {!show0 ? (
              <BiHide
                onClick={() => setShow0(true)}
                style={{ cursor: "pointer" }}
                title="show"
              />
            ) : (
              <BiShowAlt
                onClick={() => setShow0(false)}
                style={{ cursor: "pointer" }}
                title="hide"
              />
            )}
          </InputRightElement>
        </InputGroup>
        <p>Error</p>
        <Button>Invalidate Tokens</Button>
      </form>
      <p>
        Invalidating tokens is a process that is required if you suspect someone
        is using your account on your behalf.
      </p>
    </div>
  );
};

export default InvalidateTokensSettings;
