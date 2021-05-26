import React from "react";
import { code } from "./Aurebesh.module.scss";

const Aurebesh = ({ text }) => {
  return (
    <small className={code} aria-hidden="true">
      {text}
    </small>
  );
};

export default Aurebesh;
