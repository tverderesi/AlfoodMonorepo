import { Outlet } from "react-router-dom";

import { NavBar } from "./NavBar";
import { Footer } from "./Rodape";

export const PageLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
