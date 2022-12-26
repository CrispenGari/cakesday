import { Button, Image } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import "./MoreInfo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import { Footer } from "../../../components";
import { genders } from "../../../constants";
import { useUpdateProfileMutation } from "../../../graphql/generated/graphql";
import { getAccessToken } from "../../../state";

interface Props {}

const MoreInfo: React.FC<Props> = () => {
  const [bday, setBday] = useState(new Date());
  const [gender, setGender] = useState("male");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [updateProfile, { data, loading }] = useUpdateProfileMutation({
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();

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
          gender,
          bday: _bday,
          bio,
        },
      },
    });
  };

  const skip = async () => {
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
        },
      },
    });
  };

  useEffect(() => {
    if (data?.updateProfile.accessToken) {
      navigate("/auth/profile", { replace: true });
    }
    if (data?.updateProfile.error) {
      setError(data.updateProfile.error.message);
    }
  }, [data, navigate]);

  return (
    <div className="more__info">
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
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        <p>{error}</p>
        <div>
          <Button type="submit" isLoading={loading}>
            Next
          </Button>
          <Button type="button" isLoading={loading} onClick={skip}>
            Skip
          </Button>
        </div>
        <div>
          <span></span>
          <h1>Already Have an Account?</h1>
          <span></span>
        </div>
        <Button onClick={() => navigate("/auth/signin")}>Sign In</Button>
      </form>
      <Footer />
    </div>
  );
};

export default MoreInfo;
