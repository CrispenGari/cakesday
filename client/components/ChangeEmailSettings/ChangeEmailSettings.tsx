import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { ProfileType } from "../../types";
import styles from "./ChangeEmailSettings.module.css";
interface Props {
  profile: ProfileType;
}
const ChangeEmailSettings: React.FC<Props> = ({ profile }) => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [show0, setShow0] = useState<boolean>(false);

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
    }
  }, [profile]);
  return (
    <div className={styles.change__email__settings}>
      <h1>Change Email</h1>

      <form>
        <div>
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
            />
          </InputGroup>
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
        </div>
        <Button type="submit">Change Email</Button>
      </form>
      <p>Changing the email address require email verification.</p>
    </div>
  );
};

export default ChangeEmailSettings;
