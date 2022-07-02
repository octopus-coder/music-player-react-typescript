import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FBUserContext } from "../../contexts/FBUserContext";
import { Container } from "./styles";

const FacebookLoginButton: React.FC = () => {
  const { setFBID } = useContext(FBUserContext);
  const { query } = useRouter();
  async function handleFacebookLogin() {
    window.location.href = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&redirect_uri=https://music-player-react-typescript.vercel.app/&state=123`;
  }

  useEffect(() => {
    async function genFBInformation(code: string) {
      const { data: facebook_information } = await axios.post("/api/facebook", {
        code,
      });

      console.log(facebook_information);
      const { id: fb_id } = facebook_information;
      setFBID(fb_id);
    }

    if (typeof query.code === "string") {
      genFBInformation(query.code);
    }
  }, [query.code, setFBID]);

  return <Container onClick={handleFacebookLogin}>Facebook Login</Container>;
};

export default FacebookLoginButton;
