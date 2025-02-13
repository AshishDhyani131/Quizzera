import React from "react";
import leftBlob from "../assets/leftBlob.svg";
import rightBlob from "../assets/rightBlob.svg";
import { Outlet } from "react-router-dom";
const DefaultLayout = () => {
  return (
    <div className="defaultPage">
      <img id="left" src={leftBlob} alt="decoration" />
      <img id="right" src={rightBlob} alt="decoration" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
