import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt, BiUser } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Footer, Loading } from "../../components";
import {
  useSignInMutation,
  useUserQuery,
} from "../../graphql/generated/graphql";
import { setAccessToken } from "../../state";
import styles from "../../styles/SignIn.module.css";
interface Props {}
const SignIn: React.FC<Props> = ({}) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [signInHandler, { loading: submitting, data }] = useSignInMutation({
    fetchPolicy: "network-only",
  });
  const { data: user, loading } = useUserQuery({ fetchPolicy: "network-only" });

  const router = useRouter();

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
        router.replace("/");
      }
    }
  }, [data, submitting, router]);
  console.log(user);
  useEffect(() => {
    if (!loading && user?.user) {
      if (user.user.isLoggedIn && user.user.confirmed) {
        router.replace("/");
      }
    }
  }, [loading, user, router]);

  if (loading) return <Loading />;

  return (
    <div className={styles.signin}>
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
        <Link href={"/auth/forgot-password"}>Forgot Password?</Link>
        <Button type="submit" isLoading={submitting}>
          Sign In
        </Button>
        <div>
          <span></span>
          <h1>New to Cakesday?</h1>
          <span></span>
        </div>
        <Button
          onClick={() => router.push("/auth/signup")}
          disabled={submitting}
        >
          Sign Up
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default SignIn;
