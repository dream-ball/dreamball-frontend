import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const SelfieVerification = ({ selfie, setSelfie, setOnPage, submit, message }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false); // Track if selfie is captured

  useEffect(() => {
    if (!captured) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        setStream(stream);
      });
    }
  }, [captured]);

  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setSelfie(canvas.toDataURL("image/png"));
    setCaptured(true);

    // Stop webcam stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };



  const retakeSelfie = () => {
    setSelfie(null);
    setCaptured(false);

    // Restart webcam stream
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
      setStream(stream);
    });
  };

  return (
    <>
      <div className="my_header">
        <div className="my_exit" onClick={() => navigate('/matches')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
            <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
          </svg>
        </div>
        <div className="my_header_text">KYC Verification</div>
      </div>
      <div className="container-wrapper">
        <div className="verification-header">
          <h2>Verify KYC in 2 Minutes</h2>
        </div>
        <div className="container">
          <h3>Selfie Verification</h3>
          {message && <div className="message" style={{ width: "96%", margin: "auto" }} > <FaTimesCircle style={{ color: "red" }} /> <p>{message}</p></div>}

          <div className="video_con">
            {!captured && <video ref={videoRef} autoPlay />}
          </div>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <div className="self_preview">
            {selfie && <img src={selfie} alt="Captured Selfie" className="selfie-preview" />}
          </div>

          {!captured ? (
            <button onClick={captureSelfie}>Capture Selfie</button>
          ) : (
            <button onClick={retakeSelfie}>Retake</button>
          )}

          <div className="buttons">
            <button onClick={() => submit()}>Submit</button>
            <button onClick={() => setOnPage(2)}>Prev</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelfieVerification;
