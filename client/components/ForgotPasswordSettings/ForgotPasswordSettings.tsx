import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRequestChangePasswordEmailMutation } from "../../graphql/generated/graphql";
import { ProfileType } from "../../types";
import styles from "./ForgotPasswordSettings.module.css";
interface Props {
  profile: ProfileType;
}
const ForgotPasswordSettings: React.FC<Props> = ({ profile }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [requestForgotPasswordEmail, { loading, data }] =
    useRequestChangePasswordEmailMutation({ fetchPolicy: "network-only" });
  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
    }
  }, [profile]);

  useEffect(() => {
    if (data?.sendForgotPasswordEmail) {
      if (data.sendForgotPasswordEmail.success) {
        setError(`Your reset password link has been sent to: (${email})`);
      } else {
        setError(data.sendForgotPasswordEmail.message?.message ?? "");
      }
    }
  }, [data, email]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestForgotPasswordEmail({
      variables: {
        input: {
          email,
        },
      },
    });
  };

  return (
    <div className={styles.forgot__password__settings}>
      <h1>Forgot Password</h1>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<MdOutlineMailOutline color="gray" />}
          />
          <Input
            // isInvalid={data?.signUp.error?.field === "email"}
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </InputGroup>

        <p
          className={
            !data?.sendForgotPasswordEmail?.success
              ? styles.forgot__password__error
              : styles.p
          }
        >
          {error}
        </p>
        <Button type="submit" isLoading={loading}>
          Request Forgot Password Link
        </Button>
      </form>
      <p>The password reset link will be sent to this email.</p>
    </div>
  );
};

export default ForgotPasswordSettings;
