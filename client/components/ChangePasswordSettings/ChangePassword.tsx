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
import styles from "./ChangePasswordSettings.module.css";
interface Props {}
const ChangePassword: React.FC<Props> = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [show1, setShow1] = useState<boolean>(false);
  const [show0, setShow0] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  return (
    <div className={styles.change__password__settings}>
      <h1>Change Password</h1>

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
        <div>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<HiOutlineLockClosed color="gray" />}
            />
            <Input
              // isInvalid={data?.signUp.error?.field === "password"}
              type={show1 ? "text" : "password"}
              placeholder="new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputRightElement>
              {!show1 ? (
                <BiHide
                  onClick={() => setShow1(true)}
                  style={{ cursor: "pointer" }}
                  title="show"
                />
              ) : (
                <BiShowAlt
                  onClick={() => setShow1(false)}
                  style={{ cursor: "pointer" }}
                  title="hide"
                />
              )}
            </InputRightElement>
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<HiOutlineLockClosed color="gray" />}
            />
            <Input
              type={show2 ? "text" : "password"}
              placeholder="confirm password"
              value={confNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <InputRightElement>
              {!show2 ? (
                <BiHide
                  onClick={() => setShow2(true)}
                  style={{ cursor: "pointer" }}
                  title="show"
                />
              ) : (
                <BiShowAlt
                  onClick={() => setShow2(false)}
                  style={{ cursor: "pointer" }}
                  title="hide"
                />
              )}
            </InputRightElement>
          </InputGroup>
        </div>
        <p>Error</p>
        <Button>Change Password</Button>
      </form>

      <p>Changing your password is always recommended for security reasons.</p>
    </div>
  );
};

export default ChangePassword;
