import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { profileState } from "../../store/slices/userSlice";

import Navbar from "./navbar/Navbar";

import Warning from "./popups/warning/Warning";
import Upload from "./popups/upload/Upload";
import Withdraw from "./popups/withdraw/Withdraw";
import Upgrade from "./popups/upgrade/Upgrade";
import Commission from "./popups/commission/Commission";
import Premium from "./popups/premium/Premium";
import Loading from "../ui/loading/Loading";

import "react-spring-bottom-sheet/dist/style.css";

const Layout = () => {
  const { isOpen, popupName } = useSelector((state) => state.popups);
  const { username } = useSelector((state) => state.user);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (username !== profileState.username) {
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    }
  }, [username]);

  return loaded ? (
    <>
      <Outlet />
      <Navbar />
      <Warning isOpen={isOpen && popupName === "warning"} />
      <Upload isOpen={isOpen && popupName === "upload"} />
      <Withdraw isOpen={isOpen && popupName === "withdraw"} />
      <Upgrade isOpen={isOpen && popupName === "upgrade"} />
      <Commission isOpen={isOpen && popupName === "commission"} />
      <Premium isOpen={isOpen && popupName === "premium"} />
    </>
  ) : (
    <Loading />
  );
};

export default Layout;
