import { Outlet } from "react-router-dom";

import { NavBar } from "./Header";
import { Footer } from "./Footer";

export const PageLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
