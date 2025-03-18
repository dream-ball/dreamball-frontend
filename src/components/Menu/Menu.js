import React from "react";
// import profileIcon from './profileIcon.png';
import walletIcon from './wallet.jpg'
import { useNavigate } from "react-router-dom";
import './Menu.css'
export default function MenuIcon() {
    let body = document.getElementById("body")

    const navigate = useNavigate();
    return (

        <>
            <div className="menu_part">
                <div className="menu_profile_icon" onClick={() => {
                    let menu_window = document.getElementById("menu_window")
                    body.style.overflow = "hidden"
                    let menu_bar = document.getElementById("menu_bar")
                    menu_bar.style.display = "block"
                    setTimeout(() => {
                        menu_window.style.transform = "translate(0%)"
                    }, 10);
                }}>
                    <img className="menu_profile_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtYlMT_y-EHdA3AHXBo3PNPDApVNmmbAKSQ&s" alt="menuIcon"></img>
                </div>
            </div>
            <div className="menu_bar" id="menu_bar">
                <div className="menu_layer" id="menu_layer">
                    <div className="menu_click_layer"></div>
                    <div className="menu_window" id="menu_window">
                        <div className="menu_options">
                            <div className="menu_exit" onClick={() => {
                                body.style.overflow = "scroll"
                                let menu_window = document.getElementById("menu_window")
                                let menu_bar = document.getElementById("menu_bar")
                                menu_window.style.transform = "translate(-100%)"
                                setTimeout(() => {
                                    menu_bar.style.display = "none"
                                }, 500);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
                                    <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
                                </svg>
                            </div>

                            <div className="menu_header">
                                <div className="menu_user_profile">
                                    <img className="menu_user_profile_img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTtYlMT_y-EHdA3AHXBo3PNPDApVNmmbAKSQ&s" alt="User"></img>
                                </div>
                                <div className="menu_user_name">
                                    <p>Vignesh 15261</p>
                                </div>
                            </div>
                            <div className="menu_btns">
                                <div className="menu_btn menu_wallet">
                                    <div className="menu_wallet_options">
                                        <div className="menu_balance">
                                            <div className="menu_wallet_icon"><img className="menu_wallet_img" src={walletIcon} alt="wallett"></img></div>
                                            <div className="menu_my_balance">My Balance</div>
                                            <div className="menu_acnt_balance">₹0</div>
                                        </div>
                                        <div className="menu_add_btns">
                                            <div className="menu_add_cash">Add Cash</div>
                                            <div className="menu_withdraw">Withdraw</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu_value_btns">
                                    <div className="menu_values" onClick={() => {
                                        body.style.overflow="scroll"
                                        navigate('/Mymatches')
                                    }}
                                    >My matches</div>
                                    <div className="menu_values">KYC status</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}