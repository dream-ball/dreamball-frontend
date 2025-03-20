import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PanVerification = ({ panNumber, setPanNumber, setPanImage, setOnPage, panImage }) => {
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

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const base64String = await convertToBase64(file);
            setPanImage(base64String); // Store Base64 string instead of file object
        }
    };

    const checkFields = () => {
        if (!panNumber) {
            setMessage("Enter the pan number")
            return
        }

        if(!panImage){
            setMessage("Please upload pan image")
            return;
        }


        console.log("PAN Number:", panNumber);
        console.log("PAN Image (Base64):", panImage);
        setOnPage(2);
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
                    <h3>PAN Verification</h3>
                    {message && <div className="message" style={{ width: "96%", margin: "auto" }} > <FaTimesCircle style={{ color: "red" }} /> <p>{message}</p></div>}

                    <label>PAN Number:</label>
                    <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        required
                    />

                    <label>Upload PAN Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />

                    <div className="buttons">
                        <button onClick={checkFields}>Next</button>
                        <button onClick={() => setOnPage(0)}>Prev</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PanVerification;
