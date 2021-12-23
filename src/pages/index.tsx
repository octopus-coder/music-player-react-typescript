import type { NextPage } from "next";
import { default as React } from "react";
import App from "../components/App";
import AppProvider from "../contexts/AppContext";

const Home: NextPage = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Home;
