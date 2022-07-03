import type { NextApiRequest, NextApiResponse } from "next";
import SendSelectSongEvent from "../../services/capi";

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

    SendSelectSongEvent(
      songName,
      client_ip_address,
      client_user_agent,
      event_source_url,
      fbp,
      fb_login_id
    );
    response.status(200).json({ message: "Conversion Sent" });
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "Failed to send conversion" });
  }
}
