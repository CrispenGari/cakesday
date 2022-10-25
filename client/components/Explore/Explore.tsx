import React from "react";
import styles from "./Explore.module.css";
import { User } from "../../components";
import { useFriendsSuggestionsQuery } from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { UserType } from "../../types";
interface Props {}
const Explore: React.FC<Props> = ({}) => {
  const { loading, data } = useFriendsSuggestionsQuery({
    fetchPolicy: "network-only",
    variables: {
      input: {
        accessToken: getAccessToken() as any,
      },
    },
  });

  console.log(data, loading);
  return (
    <div className={styles.explore}>
      <h1>Explore Friends</h1>
      <div className={styles.explore__main}>
        {data?.suggestions?.suggestions?.map((suggestion) => (
          <User key={suggestion.id.toString()} friend={suggestion as any} />
        ))}
      </div>
      <p>These are the list of people that you can be in circle with.</p>
    </div>
  );
};

export default Explore;
