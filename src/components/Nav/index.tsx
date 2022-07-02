import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import FacebookLoginButton from "../FacebookLoginButton";
import { Container, LibraryButton, NavButtonsContainer } from "./styles";

const Nav: React.FC = () => {
  const { setLibraryStatus } = useContext(AppContext);

  function handleOpenLibrary() {
    setLibraryStatus((status) => !status);
  }

  return (
    <Container>
      <nav>Waves</nav>
      <NavButtonsContainer>
        <LibraryButton onClick={handleOpenLibrary}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </LibraryButton>
        <FacebookLoginButton />
      </NavButtonsContainer>
    </Container>
  );
};

export default Nav;
