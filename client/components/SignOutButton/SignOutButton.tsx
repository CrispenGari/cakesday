import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useSignOutMutation } from "../../graphql/generated/graphql";
import { ProfileType } from "../../types";
import styles from "./SignOutButton.module.css";
interface Props {
  profile: ProfileType;
}
const SignOutButton: React.FC<Props> = ({ profile }) => {
  const [signout, { loading }] = useSignOutMutation({
    fetchPolicy: "network-only",
  });
  const router = useRouter();

  return (
    <div className={styles.signout__btn}>
      <h1>
        currently logged in as <span>@{profile?.username}</span>
      </h1>
      <Button
        isLoading={loading}
        onClick={async () => {
          await signout();
          await router.replace("/");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutButton;
