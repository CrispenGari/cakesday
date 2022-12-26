import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../../components";
import { useChangePasswordMutation } from "../../../graphql/generated/graphql";
import { setAccessToken } from "../../../state";
import "./NewPassword.css";
interface Props {}
const NewPassword: React.FC<Props> = () => {
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [changePassword, { data, loading }] = useChangePasswordMutation({
    fetchPolicy: "network-only",
  });

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("the two password must match.");
      return;
    }
    await changePassword({
      variables: {
        input: {
          email: params.email as any,
          password: password.trim(),
          token: params.token as any,
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
        navigate("/", { replace: true });
      }
    }
  }, [data, loading, navigate]);
  return (
    <div className="new__password">
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Change Account Password</h1>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineLockClosed color="gray" />}
          />
          <Input
            // @ts-ignore
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
        <Button disabled={loading} onClick={() => navigate("/auth/signin")}>
          Sign In
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default NewPassword;
