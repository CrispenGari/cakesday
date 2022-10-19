import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt, BiUser } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import styles from "../../styles/NewPassword.module.css";
import { setAccessToken } from "../../state";
import { useChangePasswordMutation } from "../../graphql/generated/graphql";
interface Props {}
const NewPassword: React.FC<Props> = ({}) => {
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [changePassword, { data, loading }] = useChangePasswordMutation({
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("the two password must match.");
      return;
    }
    await changePassword({
      variables: {
        input: {
          email: router?.query?.email as any,
          password: password.trim(),
          token: router?.query?.token as any,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && data?.changePassword.error) {
      setError(data.changePassword.error.message);
    } else {
      setError("");
      setAccessToken(data?.changePassword.accessToken ?? "");
      if (data?.changePassword.accessToken) {
        router.replace("/");
      }
    }
  }, [data, loading, router]);
  return (
    <div className={styles.new__password}>
      <form onSubmit={onSubmit}>
        <h1>Change Account Password</h1>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineLockClosed color="gray" />}
          />
          <Input
            isInvalid={"password" === "password"}
            type={show1 ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
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
        <p>{error}</p>
        <Button type="submit" isLoading={loading}>
          Change Password
        </Button>
        <div>
          <span></span>
          <h1>I {"don't"} want to change my password?</h1>
          <span></span>
        </div>
        <Button disabled={loading} onClick={() => router.push("/auth/signin")}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default NewPassword;
