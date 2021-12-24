import axios from "axios";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";

interface GeoLocation {
  country: string;
  region_code: string;
  city: string;
  postal: string;
}

const CAPI_API = axios.create({
  baseURL: `https://graph.facebook.com/v12.0/${process.env.REACT_APP_PIXEL_ID}/events?access_token=${process.env.REACT_APP_CAPI_ACCESS_TOKEN}`,
});

async function getClientIP(): Promise<string> {
  const { data } = await axios.get("https://api.ipify.org/?format=json");
  return data.ip;
}

function parseAndHash(info: string): string {
  return CryptoJS.SHA256(info.toLowerCase().replace(" ", "")).toString();
}

async function getGeoLocation(ip: string): Promise<GeoLocation> {
  // const { data } = await axios.get<GeoLocation>(`http://ip-api.com/json/${ip}`);
  const { data } = await axios.get<GeoLocation>(`https://ipapi.co/${ip}/json/`);
  const geoLocation = {
    country: parseAndHash(data.country),
    region_code: parseAndHash(data.region_code),
    city: parseAndHash(data.city),
    postal: parseAndHash(data.postal),
  };
  return geoLocation;
}

async function SendSelectSongEvent(
  songName: string,
  client_user_agent: string
) {
  const event_id = uuid();
  const client_ip_address = await getClientIP();
  const {
    country,
    region_code: st,
    city: ct,
    postal: zp,
  } = await getGeoLocation(client_ip_address);
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
          country,
          st,
          ct,
          zp,
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
