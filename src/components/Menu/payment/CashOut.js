import React, { useState } from "react";
import "./Cashout.css";
import { FaUniversity } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { display_error } from "../../../utils/utils";
import { FaWallet, FaMoneyBillWave, FaTrophy } from "react-icons/fa";
const Cashout = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);


  const handleAmountClick = (value) => {
    setAmount(value);
    setSelectedAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      display_error("Enter an valid amount")
      return;
    }
  };
  return (
    <>
      <div className="my_header">
        <div className="my_exit" onClick={() => (navigate(-1))}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
            <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
          </svg>
        </div>
        <div className="my_header_text">Withdraw</div>
      </div>
      <div className="cashout-container">
        <h2>Cashout</h2>

        <div className="balance-card">
          <div className="balance-section">
            <FaWallet className="balance-icon wallet" />
            <div>
              <p className="balance-label">Available Balance</p>
              <p className="balance-amount">₹{1000}</p>
            </div>
          </div>

          <div className="balance-section">
            <FaMoneyBillWave className="balance-icon deposit" />
            <div>
              <p className="balance-label">Deposited Balance</p>
              <p className="balance-amount">₹{250}</p>
            </div>
          </div>

          <div className="balance-section">
            <FaTrophy className="balance-icon winning" />
            <div>
              <p className="balance-label">Winning Balance</p>
              <p className="balance-amount">₹{850}</p>
            </div>
          </div>
        </div>




        <div className="account-transfer">
          <FaUniversity /><p>Account Transfer</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Account Number" required />
          <input type="text" placeholder="Confirm Account Number" required />
          <input type="text" placeholder="Account Holder Name" required />
          <input type="text" placeholder="Bank Name" required />
          <input type="text" placeholder="IFSC Code" required />
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="amount-buttons">
            {[100, 500, 1000].map((value) => (
              <button
                key={value}
                type="button"
                className={selectedAmount === value ? "selected" : ""}
                onClick={() => handleAmountClick(value)}
              >
                ₹{value}
              </button>
            ))}
          </div>
          <div className="checkbox-container-condition">
            By clicking withdraw, you agree to the terms & conditions.
          </div>

          <button type="submit" className="cashout-button">Withdraw</button>
        </form>
      </div>
    </>
  );
};

export default Cashout;
