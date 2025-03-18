import React, { useState, useEffect } from "react";
import "./Mymatches.css";
// import LiveMatches from "../LiveMatches/LiveMatchesCard";
import History from "../History/HistoryCard";
// import MymatchesCard from './MymatchesCard'
import MatchCard from "../../Matches/MatchCard";
import { server, display_error, display_loading } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";


export default function Mymatches() {
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState('live');
    const [matches, setMatches] = useState(null);
    const [liveMatches, setLiveMatches] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                server.pathname = '/api/my-matches/'
                const res = await fetch(server, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("auth_token") ? `Bearer ${localStorage.getItem("auth_token")}` : "",
                    },
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || "Something went wrong");



                let upc_matches = (data.upcoming_matches.status) ? true : false
                if (!upc_matches) {
                    setMatches(data.upcoming_matches)
                }
                let live_matches = (data.live_matches.status) ? true : false
                if (!live_matches) {
                    setLiveMatches(data.live_matches)
                }
            } catch (error) {
                if ((error.message).toLowerCase() === "invalid or expired token") {
                    window.location.href = "/login"
                }
                else {
                    display_error(error.message)
                }
            }
            finally {
                setLoading(false)
            }
        };
        fetchMatches();
    }, []);
    return (

        <>{loading ? display_loading(true) :
            <>
            {display_loading(false)}
                <div className="my_header">
                    <div className="my_exit" onClick={() => (navigate(-1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
                            <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
                        </svg>
                    </div>
                    <div className="my_header_text">My Matches</div>
                </div>

                <div className="my_matches_con">
                    <div className="my_matches_history_btn">
                        <div className="my_history_upcoming" onClick={() => { setActivePage('matches') }}>Upcoming</div>
                        <div className="my_history_live" onClick={() => { setActivePage("live"); }}>Live</div>
                        <div className="my_history_history" onClick={() => { setActivePage("history"); }}>History</div>
                    </div>
                    <div className="my_display_con">
                        {activePage === "matches" &&
                            <>
                                <div className="contest_join">
                                    <div className="right_deg deg"></div>
                                    <div className="text">Upcoming Matches</div>
                                    <div className="left_deg deg"></div>
                                </div>
                                <div className="match">
                                    {loading ? "" : matches.length > 0 ? matches.map((match) => <MatchCard key={match.match_id} match={match} />) :
                                        <div className="no_matches_found">
                                            No upcoming matches found
                                        </div>
                                    }
                                </div>
                            </>
                        }
                        {activePage === "live" &&
                            <>
                                <div className="contest_join">
                                    <div className="right_deg deg"></div>
                                    <div className="text">Live Matches</div>
                                    <div className="left_deg deg"></div>
                                </div>
                                <div className="match">
                                    {loading ? "" : liveMatches.length > 0 ? liveMatches.map((match) => <MatchCard key={match.match_id} match={match} path={`/live/contest/${match.match_id}`} />) : <div>
                                       <div className="no_matches_found">
                                        No live matches found
                                        </div>
                                    </div>}
                                </div>
                            </>
                        }
                        {activePage === "history" && <History />}

                    </div>
                </div>
            </>

        }
        </>
    )
}