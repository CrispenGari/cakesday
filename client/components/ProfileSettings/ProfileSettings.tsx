import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import styles from "./ProfileSettings.module.css";
import DatePicker from "react-datepicker";
import { genders } from "../../constants";
import { HiOutlineCake } from "react-icons/hi";
interface Props {}
const ProfileSettings: React.FC<Props> = ({}) => {
  const [gender, setGender] = useState("male");
  const [username, setUsername] = useState("");
  const [bday, setBday] = useState(new Date());
  const [error, setError] = useState("");
  const [bio, setBio] = useState("");
  return (
    <form className={styles.profile__settings}>
      <h1>Update Profile</h1>
      {/* username, gender, bio, dob,  */}
      <div>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<BiUser color="gray" />}
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
            <HiOutlineCake />
            <DatePicker
              showTimeSelectOnly
              selected={bday}
              onChange={(date: Date) => setBday(date)}
              className={styles.profile__settings__date__picker}
            />
          </div>
          <p>date of birth: mm/dd/yy</p>
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
      <p className={styles.profile__settings__error}>{error}</p>
      <Button>Update </Button>
      <p>
        Changing your profile details will reflects to all the users of
        cakesday.
      </p>
    </form>
  );
};

export default ProfileSettings;
