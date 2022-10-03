import nodemailer from "nodemailer";
export const sendEmail = async (to: string, html: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "skhuwqpknmbv3gwa@ethereal.email", // generated ethereal user
      pass: "rgzSQGV1HA49kC4RKZ", // generated ethereal password
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
