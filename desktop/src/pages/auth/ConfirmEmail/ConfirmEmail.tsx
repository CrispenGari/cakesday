import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import "./ConfirmEmail.css";
import { BiCheck } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components";
import {
  useVerifyEmailMutation,
  useResendVerificationCodeMutation,
} from "../../../graphql/generated/graphql";
import { getAccessToken } from "../../../state";

interface Props {}

const ConfirmEmail: React.FC<Props> = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [confirmEmail, { loading: loading1, data: data1 }] =
    useVerifyEmailMutation({ fetchPolicy: "network-only" });
  const [resendConfirmationCode, { loading: loading2, data: data2 }] =
    useResendVerificationCodeMutation({ fetchPolicy: "network-only" });

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await confirmEmail({
      fetchPolicy: "network-only",
      variables: {
        input: {
          verificationCode: code.trim(),
          accessToken: getAccessToken(),
        },
      },
    });
  };
  const resendCode = async () => {
    await resendConfirmationCode({
      fetchPolicy: "network-only",
      variables: {
        input: {
          accessToken: getAccessToken() as any,
        },
      },
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
        navigate("/auth/more-info", { replace: true });
      }
    }
  }, [data1, navigate]);
  return (
    <div className="confirm__email">
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
        <p className="confirm__email__error">{error}</p>
        <p onClick={resendCode} className="confirm__email__clickable">
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
        <Button onClick={() => navigate("/auth/signin")} disabled={loading}>
          Sign In
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default ConfirmEmail;
