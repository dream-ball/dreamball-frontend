import React from "react";
import { useNavigate } from "react-router-dom";


export default function ContestHeader() {
  const navigate = useNavigate();
  // console.log(redirect_path);
  return (
    <div className="exit" onClick={() => (navigate(-1))}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
        <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
      </svg>
    </div>
  );
}
