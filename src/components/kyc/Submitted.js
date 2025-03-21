import React from "react";
import { useNavigate } from "react-router-dom";

export default function Submitted() {

  const navigate =useNavigate;
  return (
    <>
      <div className="my_header">
        <div className="my_exit" onClick={() => navigate('/matches')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
            <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
          </svg>
        </div>
        <div className="my_header_text">Kyc Verification</div>
      </div>
      <div style={{ padding: "5px","margin-top":"20px" }}>
        <div className="disclaimer-box">
          <i className="fas fa-exclamation-triangle"></i>
          <p style={{ "lineHeight": "23px" }}>
            Your KYC details have been successfully submitted! Our verification team is currently reviewing your information. This process may take some time to ensure all details are accurate and meet compliance requirements. You will receive a confirmation update once your verification is complete. If any additional information is needed, we will notify you. Thank you for your patience and cooperation!
          </p>
        </div>
      </div>
    </>
  )



};
