import { useRouter } from "next/router";
import React from "react";
import { Banner, Header, UserInfo, SignOutButton } from "../../components";
import { useMeQuery, useUserByIdQuery } from "../../graphql/generated/graphql";
import styles from "../../styles/ProfilePage.module.css";
interface Props {}
const Profile: React.FC<Props> = ({}) => {
  const router = useRouter();
  const { loading, data } = useUserByIdQuery({
    variables: {
      input: { id: Number.parseInt(router.query.uid as any) },
    },
    fetchPolicy: "network-only",
  });

  const { data: me } = useMeQuery({ fetchPolicy: "network-only" });
  console.log(me);
  return (
    <div className={styles.profile}>
      <Header />
      <div className={styles.profile__main}>
        <Banner
          profile={data?.user?.profile as any}
          isMe={me?.me?.username === data?.user?.username}
        />
        <UserInfo
          user={data?.user as any}
          isMe={me?.me?.username === data?.user?.username}
        />
        <SignOutButton profile={me?.me?.profile as any} />
      </div>
    </div>
  );
};

export default Profile;
