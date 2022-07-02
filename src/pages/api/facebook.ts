import type { NextApiRequest, NextApiResponse } from "next";
import {
  genFacebookInformation,
  IFacebookInformation,
  startFacebookLoggingIn,
} from "../../services/facebook";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<IFacebookInformation>
) {
  try {
    const access_token = await startFacebookLoggingIn(request.body.code);
    const data = await genFacebookInformation(access_token);

    response.status(200).json(data);
  } catch (e) {
    console.log(e);
    // response.status(500).send(e.response);
  }
}
