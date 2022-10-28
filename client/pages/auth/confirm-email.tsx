import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useResendVerificationCodeMutation,
  useVerifyEmailMutation,
} from "../../graphql/generated/graphql";
import styles from "../../styles/ConfirmEmail.module.css";
import { BiCheck } from "react-icons/bi";
import { Footer } from "../../components";
interface Props {}

const ConfirmEmail: React.FC<Props> = ({}) => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [confirmEmail, { loading: loading1, data: data1 }] =
    useVerifyEmailMutation({ fetchPolicy: "network-only" });
  const [resendConfirmationCode, { loading: loading2, data: data2 }] =
    useResendVerificationCodeMutation({ fetchPolicy: "network-only" });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await confirmEmail({
      fetchPolicy: "network-only",
      variables: {
        input: {
          verificationCode: code.trim(),
        },
      },
    });
  };
  const resendCode = async () => {
    await resendConfirmationCode({
      fetchPolicy: "network-only",
      variables: {},
    });
  };
  useEffect(() => {
    if (loading1 || loading2) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading1, loading2]);
  useEffect(() => {
    if (data1?.verifyEmail.error) {
      setError(data1.verifyEmail.error.message);
    } else {
      if (data1?.verifyEmail.accessToken) {
        setError("");
        router.replace("/auth/more-info");
      }
    }
  }, [data1, router]);
  return (
    <div className={styles.confirm__email}>
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Confirm Email</h1>
        <p>
          {data2?.resendVerificationCode
            ? "The verification code has been resent to your email."
            : "The email for the confirmation code has been sent to your email address."}
        </p>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiCheck color="gray" />}
          />
          <Input
            isInvalid={!!error}
            type="text"
            placeholder="0 0 0 - 0 0 0"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </InputGroup>
        <p className={styles.confirm__email__error}>{error}</p>
        <p onClick={resendCode} className={styles.confirm__email__clickable}>
          Did not receive the code?
        </p>
        <Button type="submit" isLoading={loading}>
          Confirm
        </Button>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button onClick={() => router.push("/auth/signin")} disabled={loading}>
          Sign In
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default ConfirmEmail;
