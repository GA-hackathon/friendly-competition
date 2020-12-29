import React from "react";
import Navbar from "./Navbar/Navbar";
function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-children">{children}</div>
      <footer></footer>
    </div>
  );
}

export default Layout;
