import axios from "axios";
import { v4 as uuid } from "uuid";

const CAPI_API = axios.create({
  baseURL: `https://graph.facebook.com/v12.0/333765161921328/events?access_token=${process.env.REACT_APP_CAPI_ACCESS_TOKEN}`,
});

async function getClientIP(): Promise<string> {
  const { data } = await axios.get("https://api.ipify.org/?format=json");
  return data.ip;
}

async function SendSelectSongEvent(songName: string) {
  const event_id = uuid();
  const client_user_agent = navigator.userAgent;
  const client_ip_address = await getClientIP();
  await CAPI_API.post("", {
    data: [
      {
        event_name: "SelectSong",
        event_time: Math.round(Date.now() / 1000),
        action_source: "website",
        event_id,
        event_source_url: "https://adoring-kalam-4dcc41.netlify.app/",
        user_data: {
          client_ip_address,
          client_user_agent,
        },
        custom_data: {
          name: songName,
          method: "CAPI",
        },
      },
    ],
  });
}

export default SendSelectSongEvent;
