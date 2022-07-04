import type { NextApiRequest, NextApiResponse } from "next";
import {
  genFacebookInformation,
  IFacebookInformation,
  startFacebookLoggingIn,
} from "../../services/facebook";

interface IErrorMessage {
  message?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<IFacebookInformation | IErrorMessage>
) {
  try {
    const access_token = await startFacebookLoggingIn(request.body.code);
    const data = await genFacebookInformation(access_token);

    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: (error as Error).message });
  }
}
