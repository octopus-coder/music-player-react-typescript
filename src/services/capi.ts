import axios from "axios";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";

interface GeoLocationIPAPICo {
  country?: string;
  region_code?: string;
  city?: string;
  postal?: string;
}

interface GeoLocationIPAPICOM {
  countryCode?: string;
  region?: string;
  city?: string;
  zip?: string;
}

type GeoLocation = GeoLocationIPAPICo & GeoLocationIPAPICOM;

const CAPI_API = axios.create({
  baseURL: `https://graph.facebook.com/v12.0/${process.env.REACT_APP_PIXEL_ID}/events?access_token=${process.env.REACT_APP_CAPI_ACCESS_TOKEN}`,
});

export async function getClientIP(): Promise<string> {
  const { data } = await axios.get("https://api.ipify.org/?format=json");
  return data.ip;
}

function parseAndHash(info?: string): string {
  return CryptoJS.SHA256(info?.toLowerCase().replace(" ", "") ?? "").toString();
}

async function getGeoLocation(ip?: string): Promise<GeoLocation> {
  let geoLocation: GeoLocation;
  try {
    const { data } = await axios.get<GeoLocationIPAPICo>(
      `https://ipapi.co/${ip}/json/`
    );
    geoLocation = {
      country: parseAndHash(data.country),
      region_code: parseAndHash(data.region_code),
      city: parseAndHash(data.city),
      postal: parseAndHash(data.postal),
    };
  } catch (e) {
    const { data } = await axios.get<GeoLocationIPAPICOM>(
      `http://ip-api.com/json/${ip}`
    );
    geoLocation = {
      country: parseAndHash(data.countryCode),
      region_code: parseAndHash(data.region),
      city: parseAndHash(data.city),
      postal: parseAndHash(data.zip),
    };
  }
  return geoLocation;
}

async function SendSelectSongEvent(
  songName: string,
  client_ip_address?: string,
  client_user_agent?: string,
  event_source_url?: string,
  fbp?: string
) {
  const event_id = uuid();
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
        event_source_url,
        user_data: {
          client_ip_address,
          client_user_agent,
          country,
          st,
          ct,
          zp,
          fbp,
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
