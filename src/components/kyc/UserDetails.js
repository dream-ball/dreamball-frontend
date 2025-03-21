import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ firstName, setFirstName, middleName, setMiddleName, dob, setDob, lastName, setLastName, age, setAge, city, setCity, state, setState, setOnPage }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const checkValues = () => {
    if (firstName === "" || lastName === "") {
      setMessage("Fill all the fields")
      setOnPage(0);
      return;
    }
    if (age < 18) {
      setMessage("Under 18 not allowed");
      setOnPage(0);
      return;
    }
    const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY format
    if (!dobPattern.test(dob)) {
      setMessage("Please enter DOB in DD/MM/YYYY format.");
      setOnPage(0);

      return;
    }
    if (city === "" || state === "") {
      setMessage("Fill all the fields")
      setOnPage(0);
      return;
    }
    setOnPage(1);
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
          <h3>User Details</h3>

          {message && <div className="message" style={{ width: "96%", margin: "auto" }} > <FaTimesCircle style={{ color: "red" }} /> <p>{message}</p></div>}
          <label>First Name:</label>
          <input
            type="text"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Middle Name:</label>
          <input
            type="text"
            placeholder="Enter Middle Name (Optional)"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />

          <label>Last Name:</label>
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>DOB:</label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <label>City:</label>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <label>State:</label>
          <input
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />

          <div className="buttons">
            <button onClick={() => checkValues()}>Next</button>
          </div>
        </div>
      </div >
    </>
  );
};

export default UserDetails;
