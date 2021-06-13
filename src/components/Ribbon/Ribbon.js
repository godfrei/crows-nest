import React from "react";
import { ribbon } from "./Ribbon.module.scss";

const Ribbon = ({ label }) => {
  return (
    <div className={ribbon}>{label}</div>
  );
};

export default Ribbon;
