import { Avatar, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { ProfileType } from "../../types";
import styles from "./Banner.module.css";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCamera } from "react-icons/ai";
import { getBase64, userBirthdayObject } from "../../utils";
interface Props {
  profile: ProfileType;
  isMe: boolean;
}
const Banner: React.FC<Props> = ({ profile, isMe }) => {
  const [banner, setBanner] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");

  React.useEffect(() => {
    if (profile?.bannerURL) {
      setBanner(profile.bannerURL);
    }
    if (profile?.photoURL) {
      setProfileImage(profile.photoURL);
    }
  }, [profile]);

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
  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className={styles.banner__sub__info}>
        <h1>@{profile?.username}</h1>
        <h2>Birthday {userBirthdayObject(profile?.bday).formattedBirthday}</h2>
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
          src={profileImage}
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
  );
};

export default Banner;
