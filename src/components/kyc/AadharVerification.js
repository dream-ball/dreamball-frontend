import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const AadharVerification = ({ aadhaarNumber, setAadhaarNumber, setAadhaarFrontImage, setAadhaarBackImage, setOnPage }) => {
    const [frontImage, setFrontImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [message, setMessage] = useState("");

    const navigate = useNavigate()
    // Function to convert file to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle Aadhar Front Image
    const handleFrontImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64String = await convertToBase64(file);
            setAadhaarFrontImage(base64String);
            setFrontImage(base64String); // Update local state
        }
    };

    // Handle Aadhar Back Image
    const handleBackImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64String = await convertToBase64(file);
            setAadhaarBackImage(base64String);
            setBackImage(base64String); // Update local state
        }
    };

    // Check Fields before moving to next page
    const checkFields = () => {
        if (!/^\d{12}$/.test(aadhaarNumber.trim())) {
            setMessage("Enter a valid Aadhaar number");
            return;
        }

        if (!frontImage) {
            setMessage("Upload aadhaar front image");
            return;
        }
        if (!backImage) {
            setMessage("Upload aadhaar back image");
            return;
        }
        setOnPage(3); // Proceed to next page
    };

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

            <div className="container-wrapper">
                <div className="verification-header">
                    <h2>Verify KYC in 2 Minutes</h2>
                </div>
                <div className="container">
                    <h3>Aadhar Verification</h3>
                    {message && <div className="message" style={{ width: "96%", margin: "auto" }} > <FaTimesCircle style={{ color: "red" }} /> <p>{message}</p></div>}

                    <label>Aadhar Number:</label>
                    <input
                        type="number"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        required
                    />

                    <label>Upload Aadhar Front Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFrontImageChange}
                        required
                    />

                    <label>Upload Aadhar Back Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleBackImageChange}
                        required
                    />

                    <div className="buttons">
                        <button onClick={checkFields}>Next</button>
                        <button onClick={() => setOnPage(1)}>Prev</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AadharVerification;
