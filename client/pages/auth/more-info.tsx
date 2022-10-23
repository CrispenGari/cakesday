import { Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/MoreInfo.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateProfileMutation } from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { Footer } from "../../components";

interface Props {}

const MoreInfo: React.FC<Props> = ({}) => {
  const [bday, setBday] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [updateProfile, { data, loading }] = useUpdateProfileMutation({
    fetchPolicy: "network-only",
  });
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(gender, bio, bday.toLocaleDateString());
    // alert(startDate.toLocaleDateString());
    await updateProfile({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          gender,
          bday: bday.toLocaleDateString(),
          bio,
        },
      },
    });
  };

  useEffect(() => {
    if (data?.updateProfile.accessToken) {
      router.replace("/auth/profile");
    }
  }, [data, router]);
  return (
    <div className={styles.more__info}>
      <form onSubmit={onSubmit}>
        <Image src="/main-logo.png" alt="main-logo" />
        <h1>More Info</h1>
        <h2>Date of birth</h2>
        <DatePicker selected={bday} onChange={(date: Date) => setBday(date)} />
        <h2>Bio</h2>
        <textarea
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <h2>Gender</h2>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <p>{error}</p>
        <Button type="submit">Next</Button>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
      </form>
      <Footer />
    </div>
  );
};

export default MoreInfo;
