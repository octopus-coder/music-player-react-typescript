import type { NextApiRequest, NextApiResponse } from "next";
import SendSelectSongEvent from "../../services/capi";

type ResponseData = {
  message: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  const client_user_agent = request.headers["user-agent"];
  const event_source_url = request.headers["referer"];

  const { songName, client_ip_address } = request.body;
  SendSelectSongEvent(
    songName,
    client_ip_address,
    client_user_agent,
    event_source_url
  );
  response.status(200).json({ message: "Conversion Sent" });
}
