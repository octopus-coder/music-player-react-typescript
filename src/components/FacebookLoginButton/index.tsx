import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FBUserContext } from "../../contexts/FBUserContext";
import { Container, NameContainer } from "./styles";

interface IFacebookData {
  id?: string;
  first_name?: string;
  last_name?: string;
}

const FacebookLoginButton: React.FC = () => {
  const { setFBID, fb_id, first_name, setFirstName } =
    useContext(FBUserContext);

  const router = useRouter();
  const query = router.query;

  async function handleFacebookLogin() {
    window.location.href = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FB_APP_ID}&redirect_uri=https://music-player-react-typescript.vercel.app/&state=123`;
  }

  useEffect(() => {
    async function genFBInformation(code: string) {
      const { data: facebook_information } = await axios.post("/api/facebook", {
        code,
      });
      router.push("/");

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
  }, [query.code, router, setFBID, setFirstName]);

  function handleLogOut() {
    setFirstName(null);
    setFBID(null);
    localStorage.removeItem("fb@mprt");
  }

  if (fb_id == null) {
    return <Container onClick={handleFacebookLogin}>Facebook Login</Container>;
  }

  return (
    <NameContainer>
      <p>Hi {first_name}!</p>
      <button title="logout">
        <FontAwesomeIcon onClick={handleLogOut} icon={faSignOutAlt} />
      </button>
    </NameContainer>
  );
};

export default FacebookLoginButton;
