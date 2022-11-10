import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useDeleteAccountMutation } from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import styles from "./DeleteAccountSetting.module.css";
interface Props {}
const DeleteAccountSetting: React.FC<Props> = ({}) => {
  const { replace } = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [show0, setShow0] = useState<boolean>(false);
  const [deleteAccount, { loading, data }] = useDeleteAccountMutation({
    fetchPolicy: "network-only",
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteAccount({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          currentPassword,
        },
      },
    });
  };

  React.useEffect(() => {
    if (data?.deleteAccount) {
      setError(data.deleteAccount.message?.message);
    }
  }, [data]);

  React.useEffect(() => {
    if (data?.deleteAccount) {
      if (data.deleteAccount.success) {
        replace("/");
      }
    }
  }, [data, replace]);
  return (
    <div className={styles.delete__account__settings}>
      <h1>Delete Account</h1>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiOutlineLockClosed color="gray" />}
          />
          <Input
            // isInvalid={data?.signUp.error?.field === "password"}
            type={show0 ? "text" : "password"}
            placeholder="current account password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <InputRightElement>
            {!show0 ? (
              <BiHide
                onClick={() => setShow0(true)}
                style={{ cursor: "pointer" }}
                title="show"
              />
            ) : (
              <BiShowAlt
                onClick={() => setShow0(false)}
                style={{ cursor: "pointer" }}
                title="hide"
              />
            )}
          </InputRightElement>
        </InputGroup>
        <p
          className={
            data?.deleteAccount.success
              ? styles.p
              : styles.delete__account__error
          }
        >
          {error}
        </p>
        <Button type="submit" isLoading={loading}>
          Delete Account
        </Button>
      </form>
      <p>
        Deleting your account is an irreversible action, you will lose friends
        and your information.
      </p>
    </div>
  );
};

export default DeleteAccountSetting;
