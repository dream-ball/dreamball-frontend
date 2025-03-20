import React, { useState } from "react";
import UserDetails from "./UserDetails";
import PanVerification from "./PanVerification";
import AadharVerification from "./AadharVerification";
import SelfieVerification from "./SelfieVerification";
import VerificationNotify from "./VerificationNotify";
import SomethingWentWrong from "./SomethingWentWrong";

import "./PanVerify.css";
import { server } from "../../utils/utils";

// import AddCash from "../addcash/AddCash";
// import WithdrawCash from "../Widthdrawcash/WidthdrawCash";

const PanVerify = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [panImage, setPanImage] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarFrontImage, setAadhaarFrontImage] = useState("");
  const [aadhaarBackImage, setAadhaarBackImage] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [onPage, setOnPage] = useState(0);
  const [message, setMessage] = useState("");

  const submit = async () => {

    const requestBody = {
      firstName,
      middleName,
      lastName,
      age,
      dob,
      city,
      state,
      panNumber,
      aadhaarNumber,
      aadhaarFrontImage,
      aadhaarBackImage,
      panImage
    };

    if (firstName && firstName.trim() !== "" && lastName && lastName.trim() !== "" && dob && age && !isNaN(age) && age > 0 &&
      city && city.trim() !== "" && state && state.trim() !== "" && panNumber && panNumber.trim() !== "" && aadhaarNumber && aadhaarNumber.trim() !== "" &&
      aadhaarFrontImage && aadhaarBackImage && panImage) {

    } else {
      setMessage("Required all fields")
      return;
    }

    try {
      server.pathname = '/api/getPan'
      const response = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const result = response.json()

      console.log(result)

      if (response.ok) {
        setOnPage(4); // Move to VerificationNotify
      } else {
        setOnPage(5); // Move to SomethingWentWrong
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setOnPage(5); // Move to SomethingWentWrong
    }
  };

  switch (onPage) {
    case 0:
      return (
        <UserDetails
          {...{
            firstName,
            setFirstName,
            middleName,
            setMiddleName,
            lastName,
            setLastName,
            dob,
            setDob,
            age,
            setAge,
            city,
            setCity,
            state,
            setState,
            setOnPage,
          }}
        />
      );
    case 1:
      return (
        <PanVerification
          {...{ panNumber, setPanNumber, setPanImage, panImage, setOnPage }}
        />
      );
    case 2:
      return (
        <AadharVerification
          {...{
            aadhaarNumber,
            setAadhaarNumber,
            setAadhaarFrontImage,
            setAadhaarBackImage,
            setOnPage,
          }}
        />
      );
    case 3:
      return <SelfieVerification {...{ selfie, setSelfie, setOnPage, submit,message }} />;
    case 4:
      return <VerificationNotify />;
    default:
      return <SomethingWentWrong />;
  }

};

export default PanVerify;
