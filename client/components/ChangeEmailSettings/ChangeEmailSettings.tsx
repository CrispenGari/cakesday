import {
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setEmailCard } from "../../actions";
import {
  Profile,
  useChangeEmailMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";

import styles from "./ChangeEmailSettings.module.css";
interface Props {
  profile: Profile;
}
const ChangeEmailSettings: React.FC<Props> = ({ profile }) => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [show0, setShow0] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [changeEmail, { loading, data }] = useChangeEmailMutation({
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (profile) {
      setEmail(profile.email);
    }
  }, [profile]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(setEmailCard("VERIFY_EMAIL"));
    await changeEmail({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          currentPassword,
          email,
        },
      },
    });
  };

  useEffect(() => {
    if (data?.changeEmail?.success) {
      dispatch(setEmailCard("VERIFY_EMAIL"));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (data?.changeEmail) {
      setError(data.changeEmail.message.message);
    }
  }, [data]);

  return (
    <div className={styles.change__email__settings}>
      <h1>Change Email</h1>
      <form onSubmit={onSubmit}>
        <div>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<MdOutlineMailOutline color="gray" />}
            />
            <Input
              isInvalid={data?.changeEmail.success === false}
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
              isInvalid={data?.changeEmail.success === false}
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
        </div>
        <p
          className={
            data?.changeEmail.success ? styles.p : styles.change__email__error
          }
        >
          {error}
        </p>
        <Button
          type="submit"
          isLoading={loading}
          disabled={profile?.email === email}
        >
          Request Change Email
        </Button>
      </form>
      <p>Changing the email address require email verification.</p>
    </div>
  );
};

export default ChangeEmailSettings;
