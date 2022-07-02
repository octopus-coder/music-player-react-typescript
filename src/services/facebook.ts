import axios from "axios";

export interface IFacebookInformation {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

const FACEBOOK_LOGIN = axios.create({
  baseURL: "https://graph.facebook.com/v14.0/oauth/access_token",
});

const FACEBOOK_INFORMATION = axios.create({
  baseURL:
    "https://graph.facebook.com/v14.0/me?fields=id,first_name,last_name,email",
});

export async function startFacebookLoggingIn(code: string): Promise<string> {
  const { data } = await FACEBOOK_LOGIN.get("", {
    params: {
      client_id: process.env.FB_APP_ID,
      redirect_uri: "https://music-player-react-typescript.vercel.app/",
      client_secret: process.env.APP_SECRET,
      code,
    },
  });
  const { access_token } = data;

  return access_token;
}

export async function genFacebookInformation(
  access_token: string
): Promise<IFacebookInformation> {
  const { data } = await FACEBOOK_INFORMATION.get<IFacebookInformation>("", {
    params: {
      access_token,
    },
  });
  return data;
}
