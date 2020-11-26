import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Container } from './styles';

const Nav: React.FC = () => {
  const { setLibraryStatus } = useContext(AppContext);
  return (
    <Container>
      <nav>Waves</nav>
      <button onClick={() => setLibraryStatus((status) => !status)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </Container>
  );
};

export default Nav;
