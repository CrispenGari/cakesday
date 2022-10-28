import { time } from "console";
import { months } from "../constants";
import { BirthdayType } from "../types";

export const emotions = [{}];

export const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const userBirthdayObject = (
  birthday: string | undefined
): BirthdayType => {
  if (!birthday)
    return {
      age: 0,
      formattedBirthday: "no-birthday",
      isBirthday: false,
    };
  const [_day, _month, _year] = birthday
    .split("/")
    .map((b) => Number.parseInt(b));
  const today = new Date();

  let age = today.getFullYear() - _year;
  const m = today.getMonth() - (_month - 1);
  if (m < 0 || (m === 0 && today.getDate() < _day)) {
    age--;
  }
  let isBirthday: boolean =
    today.getMonth() === _month - 1 && _day === today.getDate();

  const formateBday: string = `${_day} ${months[_month - 1]}`;
  return {
    age,
    formattedBirthday: formateBday,
    isBirthday,
  };
};

export const unixTimeStampToObject = (timestamp: string | undefined) => {
  if (!timestamp) return {};
  const date = new Date(Number.parseInt(timestamp));
  const now = new Date();
  const day = date.getDay();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return {
    day,
    month,
    year,
    formattedDate: `${day} ${month} ${year}`,
  };
};
