import type { NextPage } from "next";
import App from "../components/App";
import AppProvider from "../contexts/AppContext";
import FBUserProvider from "../contexts/FBUserContext";

const Home: NextPage = () => {
  return (
    <AppProvider>
      <FBUserProvider>
        <App />
      </FBUserProvider>
    </AppProvider>
  );
};

export default Home;
