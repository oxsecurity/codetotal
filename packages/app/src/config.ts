declare const process: {
  env: {
    CODETOTAL_HTTP_PORT: string;
    CODETOTAL_HTTP_HOST: string;
    CODETOTAL_WS_PORT: number;
    CODETOTAL_WS_HOST: number;
    UPLOAD_FILE_LIMIT_BYTES: number;
  };
};

const config = {
  CODETOTAL_HTTP_PORT: process.env.CODETOTAL_HTTP_PORT,
  CODETOTAL_HTTP_HOST: process.env.CODETOTAL_HTTP_HOST,
  CODETOTAL_WS_PORT: process.env.CODETOTAL_WS_PORT,
  CODETOTAL_WS_HOST: process.env.CODETOTAL_WS_HOST,
  UPLOAD_FILE_LIMIT_BYTES: process.env.UPLOAD_FILE_LIMIT_BYTES,
};

export default config;
