import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import styles from "./ProfileSettings.module.css";
import DatePicker from "react-datepicker";
import { genders } from "../../constants";
import { HiOutlineCake } from "react-icons/hi";

import {
  FriendsSuggestionsDocument,
  MeDocument,
  Profile,
  useUpdateProfileSettingsMutation,
} from "../../graphql/generated/graphql";
import { getAccessToken } from "../../state";
import { useSelector } from "react-redux";
import { StateType } from "../../types";
interface Props {
  profile: Profile;
}
const ProfileSettings: React.FC<Props> = ({ profile }) => {
  const [gender, setGender] = useState("male");
  const [username, setUsername] = useState("");
  const [bday, setBday] = useState(new Date());
  const [error, setError] = useState("");
  const [bio, setBio] = useState("");
  const theme = useSelector(({ theme }: StateType) => theme);
  const [updateProfile, { loading, data }] = useUpdateProfileSettingsMutation({
    fetchPolicy: "network-only",
    refetchQueries: [
      {
        query: MeDocument,
      },
      {
        query: FriendsSuggestionsDocument,
        variables: {
          input: {
            accessToken: getAccessToken() as any,
          },
        },
      },
    ],
  });
  React.useEffect(() => {
    if (profile) {
      setGender(profile?.gender);
      setUsername(profile?.username);
      setBio(profile?.bio ?? "");
      // dd/mm/yyyy
      const [dd, mm, yyyy] = profile?.bday
        ?.split("/")
        .map((e) => Number.parseInt(e));
      setBday(new Date(yyyy, mm - 1, dd));
    }
  }, [profile]);

  useEffect(() => {
    if (data?.updateProfileSettings.message) {
      setError(data.updateProfileSettings.message.message);
    }
  }, [data]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const m = bday.getMonth() + 1;
    const d = bday.getDate();
    const year = bday.getFullYear();
    const month: string = m < 10 ? "0" + m : "" + m;
    const day: string = d < 10 ? "0" + d : "" + d;
    const _bday = `${day}/${month}/${year}`;
    await updateProfile({
      variables: {
        input: {
          accessToken: getAccessToken() as any,
          bday: _bday,
          bio: bio ?? "",
          username: username ?? "",
          gender: gender ?? "",
        },
      },
    });
  };
  return (
    <form
      className={
        theme === "dark"
          ? styles.profile__settings__dark
          : styles.profile__settings
      }
      onSubmit={onSubmit}
    >
      <h1>Update Profile</h1>
      {/* username, gender, bio, dob,  */}
      <div>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiUser color={theme === "dark" ? "white" : "gray"} />}
          />
          <Input
            // isInvalid={data?.signIn.error?.field !== "password"}
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <div>
          <div className={styles.profile__settings__date}>
            <HiOutlineCake color={theme === "dark" ? "white" : "gray"} />
            <DatePicker
              showTimeSelectOnly
              selected={bday}
              onChange={(date: Date) => setBday(date)}
              className={styles.profile__settings__date__picker}
            />
          </div>
          <p>date of birth: mm/dd/yyyy</p>
        </div>
      </div>
      <div>
        <textarea
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>

      <p
        className={
          data?.updateProfileSettings.success
            ? styles.profile__settings__message
            : styles.profile__settings__error
        }
      >
        {error}
      </p>
      <Button type={"submit"} isLoading={loading}>
        Update Profile
      </Button>
      <p>
        Changing your profile details will reflects to all the users of
        cakesday.
      </p>
    </form>
  );
};

export default ProfileSettings;
