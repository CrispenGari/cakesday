import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setEmailCard } from "../../actions";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  useVerifyChangeEmailMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import styles from "./VerifyEmailSettings.module.css";
interface Props {}
const VerifyEmailSettings: React.FC<Props> = ({}) => {
  const [error, setError] = useState("");
  const [code, setCode] = useState<string>("");
  const dispatch = useDispatch();

  const [verifyEmail, { data, loading }] = useVerifyChangeEmailMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: MeDocument, variables: {} },
      {
        query: FriendsSuggestionsDocument,
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verifyEmail({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          verificationCode: code,
        },
      },
    });
  };

  useEffect(() => {
    if (data?.verifyNewEmail?.success) {
      dispatch(setEmailCard("CHANGE_EMAIL"));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (data?.verifyNewEmail) {
      setError(data.verifyNewEmail.message.message);
    }
  }, [data]);

  return (
    <div className={styles.verify__email__settings}>
      <h1>Verify Email</h1>
      <form onSubmit={onSubmit}>
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
        <p
          className={
            data?.verifyNewEmail.success
              ? styles.p
              : styles.verify__email__error
          }
        >
          {error}
        </p>
        <Button type="submit" isLoading={loading}>
          Verify
        </Button>
      </form>
      <p>
        To successfully change the email please enter the verification code,
        that was sent to your new email address.
      </p>
    </div>
  );
};

export default VerifyEmailSettings;
