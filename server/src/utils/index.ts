import nodemailer from "nodemailer";
import { User } from "../entities/User/User";
import { cloudinary } from "../cloudinary";
import fs, { ReadStream } from "fs";
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
