import React from "react";
import { prize_data, formatNumber } from "../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import './LiveContest.css'


export default function LiveContestCard({ contest, prize_detail, rank }) {
    let navigate = useNavigate();
    const { match_id } = useParams();

    let prize_details = prize_data(prize_detail.contest_id, JSON.parse(prize_detail.prize_order), prize_detail.total_spots, prize_detail.spots_available, prize_detail.entry_fee)
    return (
        <div className="cnt_card" id={`${contest.contest_id}`} >
            <div className="layer_link"></div>
            <div className="card">
                <p>{prize_details["max_prize"] === 0 ? "Practice Contest" : "Prize Pool"}</p>
                <div className="total_prize">
                    <div>{contest.prize_pool > 0 ? `₹${formatNumber(contest.prize_pool)}` : "Free"}</div>
                    {contest.status.toLowerCase() === "live" ? (
                        <div
                            data-contest-id={contest.contest_id} // Use data attribute instead of custom ones
                            onClick={() => navigate(`/live/contest/${match_id}/${contest.contest_id}`)}
                            className="entry"
                        >
                            VIEW
                        </div>
                    ) : (
                        <div className="entry joined">Cancelled</div>
                    )}
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
            <div className="contest_rank">
                {
                    contest.status.toLowerCase() === "live" ?
                        <>
                            <div className="contest_rank_header">
                                <div className="rank">Rank <p>{rank.position || 1}</p></div>
                                <div className="points">Points <p>{rank.points || 0}</p></div>
                                <div className="winings" >winnings <p>₹{rank.winnings || 0}</p></div>
                            </div></> :
                        <div className="contest_rank_header"><div> Contest cancled. Money will be Refunded </div></div>

                }

            </div>
        </div >

    );
}
