import {
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import "./ForgotPassoword.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components";
import { useRequestChangePasswordEmailMutation } from "../../../graphql/generated/graphql";
interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sendEmail, { data }] = useRequestChangePasswordEmailMutation({
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail({
      variables: {
        input: {
          email: email.trim().toLowerCase(),
        },
      },
    });
  };

  useEffect(() => {
    if (data?.sendForgotPasswordEmail.message) {
      setError(data.sendForgotPasswordEmail.message.message);
    }
  }, [data]);
  return (
    <div className="forgot__password">
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Reset Password</h1>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineMailOutline color="gray" />}
          />
          <Input
            isInvalid={data?.sendForgotPasswordEmail?.success === false}
            type="email"
            placeholder="account email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <p className="forgot__password__error">{error}</p>
        <p
          className="forgot__password__clickable"
          onClick={async () => {
            await sendEmail({
              variables: {
                input: {
                  email: email.trim().toLowerCase(),
                },
              },
            });
          }}
        >
          Did not receive the email?
        </p>
        <Button type="submit">Request Reset Link</Button>
        <div>
          <span></span>
          <h1>I remember the password?</h1>
          <span></span>
        </div>
        <Button onClick={() => navigate("/auth/signin")}>Sign In</Button>
      </form>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
