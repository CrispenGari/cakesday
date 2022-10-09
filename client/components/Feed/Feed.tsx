import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  useSignOutMutation,
  useUserQuery,
} from "../../graphql/generated/graphql";
import styles from "./Feed.module.css";
interface Props {}
const Feed: React.FC<Props> = ({}) => {
  const { loading, data } = useUserQuery({
    fetchPolicy: "network-only",
  });

  const [signOut, { loading: signingOut }] = useSignOutMutation({
    fetchPolicy: "network-only",
  });
  return (
    <div className={styles.feed}>
      <pre>
        {loading
          ? JSON.stringify(
              {
                loading,
              },
              null,
              2
            )
          : JSON.stringify(
              {
                loading,
                data,
              },
              null,
              2
            )}
      </pre>

      <Button isLoading={signingOut} onClick={() => signOut({})}>
        LOGOUT
      </Button>
    </div>
  );
};

export default Feed;
