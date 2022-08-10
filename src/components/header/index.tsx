import { ROUTES } from "constants/routes";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import WalletAccount from "./account"
const Header = observer(() => {


  return (
    <header
      className="flex justify-between items-center h-16 px-4"
      style={{ background: "#343434" }}
    >
      <h1 className="text-3xl   text-white">
        <Link to={'/?active=uni-profile'}>
          <span className="text-basecolor font-bold">Shuttle Protocol</span>{" "}
          <span className="ml-4">Demo</span>
        </Link>
      </h1>
      <nav className="text-white border border-white rounded-full h-10 flex items-center justify-center px-6 font-bold">
        <WalletAccount />
      </nav>
    </header>
  );
});
export default Header;
