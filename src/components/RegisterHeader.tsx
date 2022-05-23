import React from "react";

export interface RegisterHeaderProps {
  headerText: string;
}

const RegisterHeader: React.FC<RegisterHeaderProps> = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700" }}>{props.headerText}</h1>
      <div
        style={{
          width: "196px",
          height: "25px",
          filter: "blur(16px)",
          backgroundColor: "rgba(173, 214, 238, 0.38)",
          marginTop: "-6px",
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          zIndex: "-1",
        }}
      ></div>
    </div>
  );
};

export default RegisterHeader;
