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
import {
  useInvalidateTokensMutation,
  useSignOutMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import styles from "./InvalidateTokensSettings.module.css";
interface Props {}
const InvalidateTokensSettings: React.FC<Props> = ({}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(5);
  const [show0, setShow0] = useState<boolean>(false);

  const router = useRouter();
  const [invalidateToken, { loading, data }] = useInvalidateTokensMutation({
    fetchPolicy: "network-only",
  });
  const [signOut] = useSignOutMutation({ fetchPolicy: "network-only" });

  React.useEffect(() => {
    if (data?.invalidateToken) {
      if (data.invalidateToken.success) {
        setError(
          `${data.invalidateToken.message.message} (signing out in ${counter}(s))`
        );
      } else {
        setError(data.invalidateToken.message.message);
      }
    }
  }, [data, counter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (data?.invalidateToken?.success) {
      setCounter(5);
    } else {
      setCurrentPassword("");
    }
  }, [data]);

  useEffect(() => {
    if (data?.invalidateToken?.success) {
      if (counter === 0) {
        signOut().then(() => {
          router.replace("/").then(() => window.location.reload());
        });
      }
    }
  }, [counter, router, data, signOut]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await invalidateToken({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          currentPassword,
        },
      },
    });
  };
  return (
    <div className={styles.invalidate__tokens__settings}>
      <form onSubmit={onSubmit}>
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
        <p
          className={
            data?.invalidateToken?.success === false
              ? styles.invalidate__tokens__error
              : styles.p
          }
        >
          {error}
        </p>
        <Button type="submit" isLoading={loading}>
          Invalidate Tokens
        </Button>
      </form>
      <p>
        Invalidating tokens is a process that is required if you suspect someone
        is using your account on your behalf. You will be required to sign in
        again.
      </p>
    </div>
  );
};

export default InvalidateTokensSettings;
