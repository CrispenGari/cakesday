import { Avatar, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./Banner.module.css";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCamera } from "react-icons/ai";
import { getBase64, userBirthdayObject } from "../../utils";
import {
  FriendsSuggestionsDocument,
  MeDocument,
  Profile,
  useUpdateProfileOrBannerMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken, setAccessToken } from "../../state";
interface Props {
  profile: Profile;
  isMe: boolean;
}
const Banner: React.FC<Props> = ({ profile, isMe }) => {
  const [bannerImage, setBannerImage] = useState<any>(undefined);
  const [bannerImagePreview, setBannerImagePreview] = useState<string>("");

  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [profileImage, setProfileImage] = useState<any>(undefined);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showButton, setShowButton] = useState(false);

  const [updateProfile, { data, loading: l }] =
    useUpdateProfileOrBannerMutation({
      fetchPolicy: "network-only",

      refetchQueries: [
        {
          query: MeDocument,
          fetchPolicy: "network-only",
        },
        {
          query: FriendsSuggestionsDocument,
          fetchPolicy: "network-only",
          variables: {
            input: {
              accessToken: getAccessToken() as any,
            },
          },
        },
      ],
    });

  React.useEffect(() => {
    if (profile?.bannerURL) {
      setBannerImagePreview(profile.bannerURL);
    }
    if (profile?.photoURL) {
      setProfileImagePreview(profile.photoURL);
    }
  }, [profile]);

  React.useEffect(() => {
    setLoading(l);
  }, [l]);

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

  React.useEffect(() => {
    if (!loading && data?.updateAvatarOrBanner.accessToken) {
      setAccessToken(data?.updateAvatarOrBanner.accessToken);
      setError("");
      if (data?.updateAvatarOrBanner.accessToken) {
        setShowButton(false);
      }
    } else {
      if (data?.updateAvatarOrBanner.error) {
        setShowButton(false);
        setError(data.updateAvatarOrBanner.error.message);
      } else {
        setError("");
      }
    }
  }, [data, loading]);
  const updateProfileOrBanner = async () => {
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

  React.useEffect(() => {
    if (
      bannerImagePreview.startsWith("data:image/") ||
      profileImagePreview.startsWith("data:image/")
    ) {
      setShowButton(true);
    }
  }, [bannerImagePreview, profileImagePreview]);
  return (
    <div className={styles.banner}>
      <div
        className={styles.banner__container}
        style={{
          backgroundImage: `url(${bannerImagePreview})`,
        }}
      >
        <div className={styles.banner__sub__info}>
          <h1>@{profile?.username}</h1>
          <h2>
            Birthday {userBirthdayObject(profile?.bday).formattedBirthday}
          </h2>
          <h3>
            {userBirthdayObject(profile?.bday).age} <span>years</span>
          </h3>
        </div>
        {isMe ? (
          <div className={styles.banner__change__btn}>
            <FileUploader
              handleChange={(files: any) => handleFileChange(files, "banner")}
              name="file"
              types={["jpeg", "png", "jpg", "webp", "gif"]}
              multiple={false}
              children={<Button title="change banner">Change</Button>}
            />
          </div>
        ) : null}

        <div className={styles.banner__avatar__container}>
          <Avatar
            className={styles.banner__avatar}
            name="Profile Image"
            src={profileImagePreview}
            title={profile?.username}
          />

          {isMe ? (
            <div>
              <FileUploader
                handleChange={(files: any) => handleFileChange(files, "avatar")}
                name="file"
                types={["jpeg", "png", "jpg", "webp", "gif"]}
                multiple={false}
                children={
                  <div
                    className={styles.banner__avatar__btn}
                    title={"change avatar"}
                  >
                    <AiOutlineCamera />
                  </div>
                }
              />
            </div>
          ) : null}
        </div>
      </div>
      <p className={styles.banner__error}>{error}</p>
      {showButton ? (
        <Button isLoading={loading} onClick={updateProfileOrBanner}>
          Update
        </Button>
      ) : null}
    </div>
  );
};

export default Banner;
