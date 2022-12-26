import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt, BiUser } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Loading, Footer } from "../../../components";
import {
  useSignInMutation,
  useMeQuery,
} from "../../../graphql/generated/graphql";
import { setAccessToken } from "../../../state";

import "./SignIn.css";
const SignIn = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [signInHandler, { loading: submitting, data }] = useSignInMutation({
    fetchPolicy: "network-only",
  });
  const { data: me, loading } = useMeQuery({ fetchPolicy: "network-only" });

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInHandler({
      variables: {
        input: {
          usernameOrEmail,
          password,
        },
      },
      fetchPolicy: "network-only",
    });
  };
  useEffect(() => {
    if (!submitting && data?.signIn.error) {
      setError(data.signIn.error.message);
    } else {
      setAccessToken(data?.signIn.accessToken ?? "");
      setError("");
      if (data?.signIn.accessToken) {
        navigate("/", { replace: true });
      }
    }
  }, [data, submitting, navigate]);
  useEffect(() => {
    if (!loading && me?.me) {
      if (me.me.isLoggedIn && me.me.confirmed) {
        navigate("/", { replace: true });
      }
    }
  }, [loading, me, navigate]);

  if (loading) return <Loading />;

  return (
    <div className={"signin"}>
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Sign In</h1>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiUser color="gray" />}
          />
          <Input
            isInvalid={data?.signIn.error?.field !== "password"}
            type="text"
            placeholder="username"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineLockClosed color="gray" />}
          />
          <Input
            isInvalid={data?.signIn.error?.field === "password"}
            type={show ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            {!show ? (
              <BiHide
                onClick={() => setShow(true)}
                style={{ cursor: "pointer" }}
                title="show"
              />
            ) : (
              <BiShowAlt
                onClick={() => setShow(false)}
                style={{ cursor: "pointer" }}
                title="hide"
              />
            )}
          </InputRightElement>
        </InputGroup>

        <p>{error}</p>
        <Link to={"/auth/forgot-password"}>Forgot Password?</Link>
        <Button type="submit" isLoading={submitting}>
          Sign In
        </Button>
        <div>
          <span></span>
          <h1>New to Cakesday?</h1>
          <span></span>
        </div>
        <Button onClick={() => navigate("/auth/signup")} disabled={submitting}>
          Sign Up
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;
