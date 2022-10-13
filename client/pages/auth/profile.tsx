import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "../../utils";
import Image from "next/image";
import { useUpdateProfileOrBannerMutation } from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
interface Props {}

const Profile: React.FC<Props> = ({}) => {
  const [banner, setBanner] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [updateProfile, { data, loading: l }] =
    useUpdateProfileOrBannerMutation({ fetchPolicy: "network-only" });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          banner: profileImage,
          avatar: profileImage,
        },
      },
    });

    // router.replace("/");
  };

  console.log(data);
  const handleFileChange = async (file: any) => {
    if (file) {
      setLoading(true);
      const _file = await getBase64(file);
      setProfileImage(_file as any);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(l);
  }, [l]);
  return (
    <div className={styles.profile}>
      <form onSubmit={onSubmit}>
        <h1>Profile</h1>
        <div
          className={styles.profile__preview}
          style={{ backgroundImage: `url(${profileImage})` }}
        >
          <div className={styles.profile__image}>
            <Image
              alt="user-avatar"
              src={profileImage}
              layout="fill"
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
        </div>

        <FileUploader
          handleChange={(files: any) => handleFileChange(files)}
          name="file"
          types={["jpeg", "png", "jpg", "webp", "gif"]}
          multiple={false}
        />
        <Button type="submit" isLoading={loading}>
          Next
        </Button>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button disabled={loading} onClick={() => router.push("/auth/signin")}>
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Profile;
