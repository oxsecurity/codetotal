import axios from "axios";
import config from "../../config";

export const detectSnippetLanguage = async (snippet: string) => {
  const url = `http://${config.CODETOTAL_HTTP_HOST}:${config.CODETOTAL_HTTP_PORT}/detect-language`;
  const res = await axios.post(url, { snippet });
  console.log(res);
};
