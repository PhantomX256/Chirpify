// This component is for generalizing the layout of the main website pages

import { Outlet } from "react-router-dom";
import { LeftSidebar, TopBar, BottomBar } from "../components";

const RootLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <TopBar />
      <div className="root-main-content">
        <LeftSidebar />
        <section style={{ flex: "2" }}>
          <Outlet />
        </section>
      </div>
      <BottomBar />
    </div>
  );
};

export default RootLayout;
