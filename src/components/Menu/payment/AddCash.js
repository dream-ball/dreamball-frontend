import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCash.css"
import { display_error, display_loading, server } from "../../../utils/utils";
import { FaWallet, FaMoneyBillWave, FaTrophy } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const AddCash = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loadData, setLoadData] = useState(0)
  const [paymentSuccess, setPaymentSuccess] = useState("")
  const handleAmountClick = (value) => {
    setAmount(value);
    setSelectedAmount(value);
  };

  const navigate = useNavigate();
  useEffect(() => {
    async function menu_data() {
      try {
        server.pathname = `/api/user/`
        const response = await fetch(server, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("auth_token") || "",
          },
        });
        let result = await response.json()
        if (!response.ok) throw new Error(result.msg);
        setUserData(result.user_data)
        setLoading(false)
      }
      catch (err) {
        setLoading(false)
        if (err.message === "Invalid or expired token") {
          navigate('/login')
        }
        display_error(err.message)
      }
    }
    menu_data();
  }, [navigate, loadData])

  function loadScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function payNow() {
    try {
      const res = await loadScript();

      if (!amount > 0) {
        setMessage("Please enter a vlaid amount")
        return;
      }


      if (amount < 30) {
        setMessage("Minimum deposit ₹30")
        return;
      }

      if (amount > 5000) {
        setMessage("Maximum limit ₹5000")
        return;
      }

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      server.pathname = '/api/add-cash'
      const response = await fetch(server, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": localStorage.getItem("auth_token") || ""
        },
        body: JSON.stringify({ amount, currency: 'INR', receipt: 'receipt#1', notes: {} })
      });

      const order = await response.json();
      if (!response.ok) {
        throw new Error(order.error);
      }
      const options = {
        key: 'rzp_test_GO24k5LqGpRyRK',
        amount: order.amount,
        currency: order.currency,
        name: 'DreamBall',
        description: 'Fund Deposit',
        order_id: order.id,
        prefill: {
          name: 'DreamBall',
          email: 'support@dreaam-ball.com',
          contact: ''
        },
        theme: {
          color: '#F37254'
        },
        handler: function (response) {
          server.pathname = '/api/verify-payment'
          fetch(server, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": localStorage.getItem("auth_token") || "",

            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          }).then(res => res.json())
            .then(data => {
              if (data.status === 'ok') {
                setPaymentSuccess("Payment successfull")
                setLoadData(loadData + 1)
              } else {
                setMessage('Payment verification failed')
                setLoadData(loadData + 1)
              }
            }).catch(error => {
              console.error('Error:', error);
              alert('Error verifying payment');
            });
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      if (error.message === "Invalid or expired token") {
        navigate('/login')
      }
      setMessage(error.message)
      display_error(error.message)
      console.log(error.message);
    }

  }

  return (
    <>
      <div className="my_header">
        <div className="my_exit" onClick={() => (navigate("/matches"))}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
            <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
          </svg>
        </div>
        <div className="my_header_text">Add Cash</div>
      </div>
      {
        loading ? display_loading(true) : <>
          {display_loading(false)}
          {
            userData.length > 0 ? <>
              <div className="cashout-container">
                <h2>Add Cash</h2>
                <div className="balance-card">
                  <div className="balance-section">
                    <FaWallet className="balance-icon wallet" />
                    <div>
                      <p className="balance-label">Available Balance</p>
                      <p className="balance-amount">₹{(userData[0].funds + userData[0].deposits).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="balance-section">
                    <FaMoneyBillWave className="balance-icon deposit" />
                    <div>
                      <p className="balance-label">Deposited Balance</p>
                      <p className="balance-amount">₹{userData[0].deposits.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="balance-section">
                    <FaTrophy className="balance-icon winning" />
                    <div>
                      <p className="balance-label">Winning Balance</p>
                      <p className="balance-amount">₹{userData[0].funds.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                {message && <div className="message"> <FaTimesCircle style={{ color: "red" }} /> <p>{message}</p></div>}
                {paymentSuccess && <div className="success"><FaCheckCircle style={{ color: "green" }} /> <p> Payment successfull </p></div>}
                <form>
                  <input
                    type="number"
                    placeholder="Enter amount ( ₹30 - ₹5000 )"
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
                  <button type="button" className="addCash-button" onClick={payNow} >Add Cash</button>
                </form>
              </div>


            </> : null
          }

        </>
      }


    </>




  );
};

export default AddCash;
