import nodemailer from "nodemailer";
import { User } from "../entities/User/User";
import { cloudinary } from "../cloudinary";
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
    });
    return url;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
