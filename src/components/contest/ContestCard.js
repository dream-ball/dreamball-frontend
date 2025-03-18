import React from "react";
import { prize_data, formatNumber } from "../../utils/utils";
import {  useNavigate } from "react-router-dom";
import './Contest.css'


export default function ContestCard({ contest, registerContest, prize_detail, join }) {
  let navigate=useNavigate();
  const percentFilled = Math.min(100, ((contest.total_spots - contest.spots_available) / contest.total_spots) * 100)
  let prize_details = prize_data(prize_detail.contest_id, JSON.parse(prize_detail.prize_order), prize_detail.total_spots, prize_detail.spots_available, prize_detail.entry_fee)
  return (
    <div className="cnt_card" id={`${contest.contest_id}`} >
      <div className="layer_link" onClick={()=>navigate(`/contest/${contest.match_id}/${contest.contest_id}`)}></div>
      <div className="card" >
        <p>{prize_details["max_prize"] === 0 ? "Practice Contest" : "Prize Pool"}</p>
        <div className="total_prize">
          <div> {contest.prize_pool > 0 ? `₹${formatNumber(contest.prize_pool)}` : "Free"}</div>
          <div contest_id={contest.contest_id} className={`entry ${contest.spots_available === 0 ? "full" : ""} ${join === true ? 'joined' : ''}`} onClick={() => contest.spots_available > 0 && join !== true && registerContest(contest.contest_id)}>{join !== true ? contest.spots_available > 0 ? `${contest.entry_fee === 0 ? "Free" : `₹${contest.entry_fee}`}` : "FULL" : 'JOINED'}</div>
        </div>
        <div className="filled_bar">
          <div className="spots">
            <p id={`spots_left_${contest.contest_id}`} className="left">{contest.spots_available} <span>left</span></p>
            <p id={`total_spots_${contest.contest_id}`}className="total">{contest.total_spots} <span>spots</span></p>
          </div>
          <div className="filler">
            <div className="inc_filler" id={`inc_filler_${contest.contest_id}`} style={{ width: `${percentFilled}%` }}>
            </div>
          </div>
        </div>
      </div>
      <div className="prize">
        <div className="top_prize">🥇</div>
        <div className="amt">
          <p>Prize: {prize_details["max_prize"] === 0 ? "Glory" : `₹${prize_details["max_prize"]}`}</p>
        </div>
        <div className="amt">
        <div className="prz_img">🏆</div><p>Winners:{prize_details["winners_percentage"]}</p>
        </div>
      </div>
    </div >

  );
}
