import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/ForgotPassword.module.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { useRequestChangePasswordEmailMutation } from "../../graphql/generated/graphql";
interface Props {}

const ForgotPassword: React.FC<Props> = ({}) => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sendEmail, { data, loading }] = useRequestChangePasswordEmailMutation({
    fetchPolicy: "network-only",
  });
  const router = useRouter();

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
    <div className={styles.forgot__password}>
      <form onSubmit={onSubmit}>
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
        <p className={styles.forgot__password__error}>{error}</p>
        <p
          className={styles.forgot__password__clickable}
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
        <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
