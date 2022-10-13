
  // types for your environmental variables
  declare namespace NodeJS {
    export interface ProcessEnv {
      REFRESH_TOKEN_SECRETE : string;
			ACCESS_TOKEN_SECRETE : string;
			NODEMAILER_USER : string;
			NODEMAILER_PASSWORD : string;
			CLOUDNARY_CLOUD_NAME : string;
			CLOUDNARY_API_KEY : string;
			CLOUDNARY_API_SECRET : string;
			CLOUDNARY_UPLOAD_PRESET : string;

    }
  }
  