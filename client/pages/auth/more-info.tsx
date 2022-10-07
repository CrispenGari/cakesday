import { Button, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/MoreInfo.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {}

const MoreInfo: React.FC<Props> = ({}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [bio, setBio] = useState("");
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // alert(startDate.toLocaleDateString());
    router.replace("/auth/profile");
  };
  return (
    <div className={styles.more__info}>
      <form onSubmit={onSubmit}>
        <h1>More Info</h1>
        <p>Date of birth</p>
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <p>Bio</p>
        <textarea
          placeholder="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <p>Gender</p>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <p>Error</p>
        <Button type="submit">Next</Button>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
      </form>
    </div>
  );
};

export default MoreInfo;
