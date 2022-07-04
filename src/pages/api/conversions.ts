import type { NextApiRequest, NextApiResponse } from "next";
import SendSelectSongEvent, {
  ICustomData,
  IUserData,
} from "../../services/capi";

type ResponseData = {
  message: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  try {
    const client_user_agent = request.headers["user-agent"];
    const event_source_url = request.headers["referer"];

    const { songName, client_ip_address, fb_login_id } = request.body;
    const fbp = request.cookies["_fbp"];

    const custom_data: ICustomData = {
      songName,
    };

    const user_data: IUserData = {
      client_ip_address,
      client_user_agent,
      event_source_url,
      fbp,
      fb_login_id,
    };

    SendSelectSongEvent(custom_data, user_data);

    response.status(200).json({ message: "Conversion Sent" });
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "Failed to send conversion" });
  }
}
