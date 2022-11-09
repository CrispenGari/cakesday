import { User } from "../entities/User/User";

export const verificationCodeEmailTemplate = (
  verificationCode: string,
  user: User
): string => {
  return `
  <h1>Hello, ${user.username}</h1>
  <p>We have a new account creation request at your email (${user.email}). If you intent to join CakesDay social application please verify your email.</p>
  <p>The verification code is:</p>
  <h4>${verificationCode}</h4>
  <p><em>Note: This code will be valid for an hour.</em></p>
  <p>Regards</p>
  <p>CakesDay Team</p>
`;
};

export const changeEmailVerificationCodeTemplate = (
  verificationCode: string,
  { username, email: currentEmail }: User,
  email: string
) => {
  return `
  <h1>Hello, ${username}</h1>
  <p>You have requested to change your email for your <b>cakesday account</b>
    <strong>(${currentEmail})</strong> to <strong>(${email})</strong>. 
    If you do not intent to change the email address of your <b>cakesday account</b> ignore this email.</p>
  <p>The verification code is:</p>
  <h4>${verificationCode}</h4>
  <p><em>Note: This code will be valid for an hour.</em></p>
  <p>Regards</p>
  <p>CakesDay Team</p>
`;
};
