
  // types for your environmental variables
  declare namespace NodeJS {
    export interface ProcessEnv {
      REFRESH_TOKEN_SECRETE : string;
			ACCESS_TOKEN_SECRETE : string;
			NODEMAILER_USER : string;
			NODEMAILER_PASSWORD : string;

    }
  }
  