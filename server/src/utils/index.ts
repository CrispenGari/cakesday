import nodemailer from "nodemailer";
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
