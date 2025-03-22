import React, { useState, useEffect } from "react";
import { timeLeft } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function MatchCard({ match ,path ,type}) {
      const navigate = useNavigate();

    const [timeRemaining, setTimeRemaining] = useState(timeLeft(match.match_time, match.date_wise));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(timeLeft(match.match_time, match.date_wise));
            
        }, 1000);

        return () => clearInterval(interval); // Cleanup when component unmounts
    }, [match.match_time, match.date_wise]);

    return (
        <div className="match" id={`${match.match_id}`} onClick={() =>path?navigate(path):navigate(`/contest/${match.match_id}`)}>
            <section className="matches">
                <div className="league">
                    <p>{match.series}</p>
                    <p className="timing">{match.match_time}</p>
                </div>
                <div className="match_card">
                    <div className="team team_a">
                        <div className="team_info">
                            <div className="img_con">
                                <img src={match.team_a_img} alt="team1_img" />
                            </div>
                            <div className="team_a_nick">{match.team_a_short}</div>
                        </div>
                        <div className="team_a_name">{match.team_a}</div>
                    </div>

                    <div className="team team_b">
                        <div className="team_info">
                            <div className="team_a_nick">{match.team_b_short}</div>
                            <div className="img_con">
                                <img src={match.team_b_img} alt="team2_img" />
                            </div>
                        </div>
                        <div className="team_b_name">{match.team_b}</div>
                    </div>
                </div>
                <div className="match_status">
                    <div className="live_data">
                        {type!=="history" ? <p>Match starts in</p> : null}
                        <h3 className="timeLeft">{type!=="history"? timeRemaining :'Ended'}</h3>
                    </div>
                </div>
                <div className="view_card">
                    <div className="match_lean">
                        Mega <span>{match.prize_pool}+</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
