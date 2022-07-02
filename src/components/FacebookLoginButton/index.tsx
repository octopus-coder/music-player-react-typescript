import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "./styles";

const FacebookLoginButton: React.FC = () => {
  const { query } = useRouter();
  async function handleFacebookLogin() {
    // window.open(
    //   `https://www.facebook.com/v14.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&redirect_uri=https://music-player-react-typescript.vercel.app/&state=123_123`
    // );
    window.location.href = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&redirect_uri=https://music-player-react-typescript.vercel.app/&state=123`;
  }

  useEffect(() => {
    async function genFBInformation(code: string) {
      const { data: facebook_information } = await axios.post("/api/facebook", {
        code,
      });

      console.log(facebook_information);
    }

    if (typeof query.code === "string") {
      genFBInformation(query.code);
    }
  }, [query.code]);

  return <Container onClick={handleFacebookLogin}>Facebook Login</Container>;
};

export default FacebookLoginButton;
