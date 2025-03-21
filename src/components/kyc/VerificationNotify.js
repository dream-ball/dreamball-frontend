import { useNavigate } from "react-router-dom"

export default function VerificationNotify(params) {
  const navigate = useNavigate()
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
      <div style={{ padding: "5px", "margin-top": "20px"}}>
        <div className="disclaimer-box" style={{backgroundColor:"#e6ffe9", borderLeft:"5px solid #12f320" }}>
          <i className="fas fa-exclamation-triangle"></i>
          <p style={{ "lineHeight": "23px" }}>
            🎉KYC Verification Successful!🎉
            <br></br>
            Congratulations! Your KYC verification has been successfully completed. Your identity and details have been verified, and you are now fully authorized to proceed with all platform features.
            <br></br>
            ✅Status: Verified
            <br></br>
            🔒Your information is securely stored and protected.
            <br></br>
            Thank you for completing the verification process! If you have any questions or need assistance, feel free to reach out to our support team.
          </p>
        </div>
      </div>
    </>
  )
};
