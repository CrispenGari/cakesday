export const __env__: "dev" | "prod" = "dev";
export const __port__: any = process.env.PORT || 3001;
export const __maxAge__: number = 1000 * 60 * 60 * 24 * 7; // 7 days
export const __secure__: boolean = false;
export const __cookieName__: string = "qid";
export const __cookieSecret__: string = "this_should_be_hidden";

export const __clientURL__: string =
  __env__ === "dev" ? "http://localhost:3000" : "http://localhost:3000";
//
export const __maxVerificationAge__: number = 60 * 60; // 1 hour
export const __maxResetPasswordLinkAge__: number = 60 * 60 * 2; // 2 hrs

// Prefixes
export const __reset__password__prefix: string = "reset-password:";
export const __confirm__email__prefix: string = "confirm-email:";
export const __reset__password__link__prefix: string = "reset-password-link";
