import React from "react";

export interface RegisterHeaderProps {
  headerText: string;
}

const RegisterHeader: React.FC<RegisterHeaderProps> = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "28px", fontWeight: "bold" }}>{props.headerText}</div>
      <div
        style={{
          width: "196px",
          height: "25px",
          filter: "blur(16px)",
          backgroundColor: "rgba(173, 214, 238, 0.5)",
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
