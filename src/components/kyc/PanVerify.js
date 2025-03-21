import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import PanVerification from "./PanVerification";
import AadharVerification from "./AadharVerification";
import SelfieVerification from "./SelfieVerification";
//import VerificationNotify from "./VerificationNotify";
import "./PanVerify.css";
import { display_error, display_loading, server } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import Submitted from "./Submitted";
import VerificationNotify from "./VerificationNotify";


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
  const [onPage, setOnPage] = useState(6);
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(true);

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
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("auth_token") || ""

        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json()

      console.log(result)

      if (response.ok) {
        setOnPage(5); // Move to VerificationNotify
      } else {
        throw new Error(result.error);
        // Move to SomethingWentWrong
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage(error.message)
    }
  };



  useEffect(() => {
    const fetchKycStatus = async () => {
      try {

        server.pathname = "/api/kyc-status/";
        const resLive = await fetch(server, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("auth_token")
              ? `Bearer ${localStorage.getItem("auth_token")}`
              : "",
          },
        });

        const kycData = await resLive.json();
        if (!resLive.ok) throw new Error(kycData.error || "Something went wrong");

        if (kycData.status === "pending") {
          setOnPage(4)
        }
        if (kycData.status === "rejected") {
          display_error("You Kyc was rejected...please try again")
          setOnPage(0)
        }

        if (kycData.status === "verified") {
          setOnPage(5)
        }

      } catch (error) {
        if ((error.message).toLowerCase() === "invalid or expired token") {
          navigate("/login");
        } else {
          if (error.message === "No KYC record found for this user") {
            setOnPage(0)
          }
          else {
            display_error(error.message);
          }
        }
      } finally {
        display_loading(false);
      }
    };

    fetchKycStatus();
  }, [navigate]);



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
      return <SelfieVerification {...{ selfie, setSelfie, setOnPage, submit, message }} />;
    case 4:
      return <Submitted />
    case 5:
      return <VerificationNotify />

    case 6:
      return <> {display_loading(true)}</>
    default:
      return;
  }

};

export default PanVerify;
