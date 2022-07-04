import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FBUserContext } from "../../contexts/FBUserContext";
import { Container } from "./styles";

interface IFacebookData {
  id?: string;
  first_name?: string;
  last_name?: string;
}

const FacebookLoginButton: React.FC = () => {
  const { setFBID, fb_id, first_name, setFirstName } =
    useContext(FBUserContext);
  const { query } = useRouter();
  async function handleFacebookLogin() {
    window.location.href = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&redirect_uri=https://music-player-react-typescript.vercel.app/&state=123`;
  }

  useEffect(() => {
    async function genFBInformation(code: string) {
      const { data: facebook_information } = await axios.post("/api/facebook", {
        code,
      });

      const { id: fb_id, first_name } = facebook_information;
      setFBID(fb_id);
      setFirstName(first_name);

      const fb_json = JSON.stringify(facebook_information);
      localStorage.setItem("fb@mprt", fb_json);
    }

    const { id: fbID, first_name }: IFacebookData = JSON.parse(
      localStorage.getItem("fb@mprt") ?? "{}"
    );

    if (typeof fbID === "string") {
      setFBID(fbID);
      setFirstName(first_name);
      return;
    }

    if (typeof query.code === "string") {
      genFBInformation(query.code);
    }
  }, [query.code, setFBID, setFirstName]);

  if (fb_id == null) {
    return <Container onClick={handleFacebookLogin}>Facebook Login</Container>;
  }

  return <p>Hi {first_name}!</p>;
};

export default FacebookLoginButton;
