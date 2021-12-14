import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import ReactPixel from "react-facebook-pixel";
import { AppContext } from "../../AppContext";
import { Container } from "./styles";

const Nav: React.FC = () => {
  const { setLibraryStatus } = useContext(AppContext);

  function handleOpenLibrary() {
    setLibraryStatus((status) => !status);
    ReactPixel.trackCustom("Clicked Library");
  }

  return (
    <Container>
      <nav>Waves</nav>
      <button onClick={handleOpenLibrary}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </Container>
  );
};

export default Nav;
