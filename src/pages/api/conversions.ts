import type { NextApiRequest, NextApiResponse } from "next";
import SendSelectSongEvent from "../../services/capi";

type ResponseData = {
  message: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  const { songName, client_ip_address, client_user_agent } = request.body;
  SendSelectSongEvent(songName, client_ip_address, client_user_agent);
  response.status(200).json({ message: "Conversion Sent" });
}
