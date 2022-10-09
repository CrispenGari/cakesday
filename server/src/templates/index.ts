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
  <p>Regards</p>
  <p>CakesDay Team</p>
`;
};
