import { Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "../../utils";
import {
  ImAuthenticatedDocument,
  useUpdateProfileOrBannerMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken, setAccessToken } from "../../state";
import { AiOutlineCamera } from "react-icons/ai";
import { Avatar } from "@chakra-ui/react";
import { Footer } from "../../components";
import { GetServerSidePropsContext } from "next";
import { client } from "../../providers/ApolloGraphQLProvider/ApolloGraphQLProvider";
interface Props {}

const Profile: React.FC<Props> = ({}) => {
  const [bannerImage, setBannerImage] = useState<any>(undefined);
  const [bannerImagePreview, setBannerImagePreview] = useState<string>("");

  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [profileImage, setProfileImage] = useState<any>(undefined);

  const [updateProfile, { data, loading: l }] =
    useUpdateProfileOrBannerMutation({ fetchPolicy: "network-only" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateProfile({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          bannerImage,
          avatarImage: profileImage,
        },
      },
    });
  };

  const handleFileChange = async (file: any, field: "banner" | "avatar") => {
    if (file) {
      setLoading(true);
      const _file = await getBase64(file);
      field === "avatar"
        ? setProfileImagePreview(_file as any)
        : setBannerImagePreview(_file as any);
      field === "avatar" ? setProfileImage(file) : setBannerImage(file);
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
  return (
    <div className={styles.profile}>
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>Profile</h1>
        <div
          className={styles.profile__preview}
          style={{
            backgroundImage: `url(${bannerImagePreview})`,
          }}
        >
          <div className={styles.profile__image__container}>
            <Avatar
              className={styles.profile__image}
              name="Profile Image"
              src={profileImagePreview}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const refreshToken = context.req.cookies?.qid ?? "";
  const { data, errors } = await client.mutate({
    mutation: ImAuthenticatedDocument,
    variables: {
      input: {
        refreshToken,
      },
    },
  });
  if (data?.imAuthenticated?.imAuthenticated === true) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}
