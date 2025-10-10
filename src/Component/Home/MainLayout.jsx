import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Section/Navbar";
import Login from "../Section/Login";

const MainLayout = () => {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  // Hide navbar on specific routes (chat page here)
  const noHeaderFooter = location.pathname === '/chat';

  return (
    <>
      {!noHeaderFooter && <Navbar />}

      {/* ✅ Pass openLoginModal down to children using Outlet context */}
      <Outlet context={{ openLoginModal }} />

      {/* ✅ Global Login Modal */}
      <Login
        isOpen={isLoginOpen}
        onRequestClose={closeLoginModal}
        openSignup={() => {
          closeLoginModal();
          console.log("open signup modal");
        }}
      />
    </>
  );
};

export default MainLayout;
