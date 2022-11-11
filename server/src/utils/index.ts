import nodemailer from "nodemailer";
import { User } from "../entities/User/User";
import { cloudinary } from "../cloudinary";
import fs, { existsSync, ReadStream, unlinkSync } from "fs";
import { join, extname } from "path";
import { createWriteStream } from "fs";
import { __serverURL__ } from "../constants";
export const sendEmail = async (to: string, html: string, subject: string) => {
  // let testAccount = await nodemailer.createTestAccount();

  // console.log(testAccount);
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },
  });
  const info = await transporter.sendMail({
    from: '"Fake App" <foo@example.com>', // sender address
    to,
    subject, // Subject line
    html,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const getDownloadURL = async (
  data: string,
  user: User,
  type: string
): Promise<string | undefined> => {
  try {
    const { url } = await cloudinary.uploader.upload(data, {
      public_id: `${user.username}-${type}`,
      upload_preset: process.env.CLOUDNARY_UPLOAD_PRESET, // the folder we are uploading
      timeout: 120000,
    });
    return url;
  } catch (error) {
    console.error("Upload Error", error);
    return undefined;
  }
};

// base64 to images

export const writeBase64 = async (
  base64: string,
  isBanner: boolean,
  { id, username }: User
): Promise<{
  success: boolean;
  url?: string;
}> => {
  try {
    const __: string = `@${username}-${id}-${
      isBanner ? "banner" : "profile"
    }.jpg`;
    const path = join(
      __dirname,
      `../../images/${isBanner ? "banners" : "profiles"}/${__}`
    );
    const buffer = await Buffer.from(base64, "base64");
    await fs.writeFileSync(path, buffer);
    const url: string = `${__serverURL__}/storage/images/images/${
      isBanner ? "banners" : "profiles"
    }/${__}`;
    return {
      url,
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      url: undefined,
    };
  }
};

export const uploadFileAndGetUrl = (
  createReadStream: () => ReadStream,
  fileName: string,
  isBanner: boolean,
  { username, id }: User
): Promise<{
  success: boolean;
  url?: string;
}> => {
  const extension = extname(fileName);
  const __: string = `@${username}-${id}-${
    isBanner ? "banner" : "profile"
  }${extension}`;
  const path = join(
    __dirname,
    `../../images/${isBanner ? "banners" : "profiles"}/${__}`
  );
  const url: string = `${__serverURL__}/storage/images/${
    isBanner ? "banners" : "profiles"
  }/${__}`;
  return new Promise(async (resolve, reject) => {
    await createReadStream()
      .pipe(createWriteStream(join(path)))
      .on("finish", () => {
        return resolve({
          success: true,
          url,
        });
      })
      .on("error", (error) => {
        console.log("Error: ", error);
        return reject({
          success: false,
        });
      });
  });
};

// http://localhost:3001/storage/images/profiles/@username19-13-profile.png

export const deleteFileFromStorage = (
  url: string
): Promise<{
  success: boolean;
}> => {
  const _location: string = url.replace(__serverURL__ + "/storage", "");
  const path = join(__dirname, `../../${_location}`);

  return new Promise(async (resolve, reject) => {
    try {
      if (await existsSync(path)) await unlinkSync(path);
      return resolve({
        success: true,
      });
    } catch (err) {
      console.log(err);
      return reject({
        success: !true,
      });
    }
  });
};

export const isUserBirthday = (birthday: string | undefined): boolean => {
  if (!birthday) return false;
  const [_day, _month, _year] = birthday
    .split("/")
    .map((b) => Number.parseInt(b));
  const today = new Date();
  return today.getMonth() === _month - 1 && _day === today.getDate();
};

export const calculateBelatedBithdays = (
  birthday: string | undefined
): {
  days: number;
} => {
  if (!birthday)
    return {
      days: 0,
    };
  const [_day, _month, _year] = birthday
    .split("/")
    .map((b) => Number.parseInt(b));
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const a = new Date();
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(_year, (_month - 1) as any, _day);
  const days = Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
  return {
    days,
  };
};
