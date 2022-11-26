import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  useChangePasswordSettingsMutation,
  useSignOutMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { StateType } from "../../types";
import styles from "./ChangePasswordSettings.module.css";
interface Props {}
const ChangePassword: React.FC<Props> = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [counter, setCounter] = useState(5);
  const [newPassword, setNewPassword] = useState("");
  const [confNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [show1, setShow1] = useState<boolean>(false);
  const [show0, setShow0] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const theme = useSelector(({ theme }: StateType) => theme);
  const router = useRouter();

  const [changePassword, { loading, data }] = useChangePasswordSettingsMutation(
    { fetchPolicy: "network-only" }
  );
  const [signOut] = useSignOutMutation({ fetchPolicy: "network-only" });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (data?.changePasswordSettings) {
      if (data.changePasswordSettings.success) {
        setError(
          `${data.changePasswordSettings.message.message} (signing out in ${counter}(s))`
        );
      } else {
        setError(data.changePasswordSettings.message.message);
      }
    }
  }, [data, counter]);

  useEffect(() => {
    if (data?.changePasswordSettings?.success) {
      setCounter(5);
    } else {
      setNewPassword("");
      setConfirmNewPassword("");
      setCurrentPassword("");
    }
  }, [data]);

  useEffect(() => {
    if (data?.changePasswordSettings?.success) {
      if (counter === 0) {
        signOut().then(() => {
          router.replace("/").then(() => window.location.reload());
        });
      }
    }
  }, [counter, router, data, signOut]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await changePassword({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          currentPassword,
          password1: newPassword,
          password2: confNewPassword,
        },
      },
    });
  };
  return (
    <div
      className={
        theme === "dark"
          ? styles.change__password__settings__dark
          : styles.change__password__settings
      }
    >
      <h1>Change Password</h1>

      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={
              <HiOutlineLockClosed
                color={theme === "dark" ? "white" : "gray"}
              />
            }
          />
          <Input
            isInvalid={
              data?.changePasswordSettings.message?.field === "currentPassword"
            }
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
                color={theme === "dark" ? "white" : "gray"}
              />
            ) : (
              <BiShowAlt
                onClick={() => setShow0(false)}
                style={{ cursor: "pointer" }}
                title="hide"
                color={theme === "dark" ? "white" : "gray"}
              />
            )}
          </InputRightElement>
        </InputGroup>
        <div>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <HiOutlineLockClosed
                  color={theme === "dark" ? "white" : "gray"}
                />
              }
            />
            <Input
              isInvalid={
                data?.changePasswordSettings.message?.field === "newPassword"
              }
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
                  color={theme === "dark" ? "white" : "gray"}
                />
              ) : (
                <BiShowAlt
                  onClick={() => setShow1(false)}
                  style={{ cursor: "pointer" }}
                  title="hide"
                  color={theme === "dark" ? "white" : "gray"}
                />
              )}
            </InputRightElement>
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={
                <HiOutlineLockClosed
                  color={theme === "dark" ? "white" : "gray"}
                />
              }
            />
            <Input
              isInvalid={
                data?.changePasswordSettings.message?.field === "newPassword"
              }
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
                  color={theme === "dark" ? "white" : "gray"}
                />
              ) : (
                <BiShowAlt
                  onClick={() => setShow2(false)}
                  style={{ cursor: "pointer" }}
                  title="hide"
                  color={theme === "dark" ? "white" : "gray"}
                />
              )}
            </InputRightElement>
          </InputGroup>
        </div>
        <p
          className={
            !data?.changePasswordSettings?.success
              ? styles.change__password__error
              : styles.p
          }
        >
          {error}
        </p>
        <Button type={"submit"} isLoading={loading}>
          Change Password
        </Button>
      </form>

      <p>Changing your password is always recommended for security reasons.</p>
    </div>
  );
};

export default ChangePassword;
