import { Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "../../utils";
import { useUpdateProfileOrBannerMutation } from "../../graphql/generated/graphql";
import { getAccessToken, setAccessToken } from "../../state";
import { AiOutlineCamera } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { Footer } from "../../components";
interface Props {}

const Profile: React.FC<Props> = ({}) => {
  const [banner, setBanner] = useState<string>("");
  const [accessToken, setAT] = useState<string>("");
  const [error, setError] = useState<string>("");
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
          banner: banner ?? undefined,
          avatar: profileImage ?? undefined,
        },
      },
    });

    // router.replace("/");
  };

  useEffect(() => {
    console.log(getAccessToken());
  }, []);

  const handleFileChange = async (file: any, field: "banner" | "avatar") => {
    if (file) {
      setLoading(true);
      const _file = await getBase64(file);
      field === "avatar"
        ? setProfileImage(_file as any)
        : setBanner(_file as any);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(l);
  }, [l]);

  useEffect(() => {
    if (!loading && data?.updateAvatarOrBanner.accessToken) {
      setAccessToken(data?.updateAvatarOrBanner.accessToken);
      setError("");
      if (data?.updateAvatarOrBanner.accessToken) {
        router.replace("/");
      }
    } else {
      if (data?.updateAvatarOrBanner.error) {
        setError(data.updateAvatarOrBanner.error.message);
      } else {
        setError("");
      }
    }
  }, [data, loading, router]);

  console.log(data);
  return (
    <div className={styles.profile}>
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Profile</h1>
        <div
          className={styles.profile__preview}
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className={styles.profile__image__container}>
            <Avatar
              className={styles.profile__image}
              name="Profile Image"
              src={profileImage}
              background="lightgray"
            />

            <div>
              <FileUploader
                handleChange={(files: any) => handleFileChange(files, "avatar")}
                name="file"
                types={["jpeg", "png", "jpg", "webp", "gif"]}
                multiple={false}
                children={<AiOutlineCamera />}
              />
            </div>
          </div>
          <div className={styles.profile__preview__banner__btn}>
            <FileUploader
              handleChange={(files: any) => handleFileChange(files, "banner")}
              name="file"
              types={["jpeg", "png", "jpg", "webp", "gif"]}
              multiple={false}
              children={<AiOutlineCamera />}
            />
          </div>
        </div>
        <p>{error}</p>
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
      <Footer />
    </div>
  );
};

export default Profile;
