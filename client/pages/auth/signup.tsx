import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImAuthenticatedDocument, useSignUpMutation } from "../../graphql/generated/graphql";
import { BiHide, BiShowAlt, BiUser } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { HiOutlineLockClosed } from "react-icons/hi";
import styles from "../../styles/SignUp.module.css";
import { setAccessToken } from "../../state";
import { Footer } from "../../components";
import { GetServerSidePropsContext } from "next";
import { client } from "../../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
interface Props {}
const SignUp: React.FC<Props> = ({}) => {
  const [username, setUsername] = useState<string>("");
  const [show1, setShow1] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");

  const [signUpHandler, { loading, data }] = useSignUpMutation({
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confPassword) {
      setError("the two password must match.");
      return;
    }
    await signUpHandler({
      variables: {
        input: {
          email,
          password,
          username,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading && data?.signUp.error) {
      setError(data.signUp.error.message);
    } else {
      setError("");
      setAccessToken(data?.signUp.accessToken ?? "");
      if (data?.signUp.accessToken) {
        router.replace("/auth/confirm-email");
      }
    }
  }, [data, loading, router]);
  console.log(loading, data);
  return (
    <div className={styles.signup}>
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Sign Up</h1>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiUser color="gray" />}
          />
          <Input
            isInvalid={data?.signUp.error?.field === "username"}
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineMailOutline color="gray" />}
          />
          <Input
            isInvalid={data?.signUp.error?.field === "email"}
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
            isInvalid={data?.signUp.error?.field === "password"}
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
          Sign Up
        </Button>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button disabled={loading} onClick={() => router.push("/auth/signin")}>
          Sign In
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default SignUp;


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const refreshToken = context.req.cookies?.qid ?? "";
  const { data, errors } = await client.mutate({
    mutation: ImAuthenticatedDocument,
    variables: {
      input: {
        refreshToken,
      },
    },
  });
  if (data?.imAuthenticated?.imAuthenticated === true) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
