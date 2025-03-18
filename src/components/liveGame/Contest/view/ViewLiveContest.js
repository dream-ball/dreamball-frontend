import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server, display_error, display_loading } from "../../../../utils/utils";
import ViewLiveContestCard from "./ViewLiveContestCard";
function ViewLiveContest() {
    const { match_id, contest_id } = useParams();
    const navigate = useNavigate();
    const [matchData, setMatchData] = useState(null);
    const [contests, setContests] = useState(null);
    const [prize_detail, set_prize_detail] = useState(null);
    const [currentFill, setCurrentFill] = useState([])
    const [contestType, setContestType] = useState([])
    const [currentPrizePoll,setCurrentPrizePool] =useState([])
    const [join, setJoin,] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        setJoin(true); 
    }, []);
    const fetchMatchData = useCallback(async () => {
        try {
            server.pathname = `/api/live_match/${match_id}`
            const res = await fetch(server, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Something went wrong");
            setMatchData(JSON.parse(data.match_data));
        } catch (err) {
            setError(err.message);
        }
        finally {
        }
    }, [match_id]);

    const fetchRankings = useCallback(async () => {
        try {
            server.pathname = `/api/rankings/${match_id}/${contest_id}`
            const res = await fetch(server, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Something went wrong");

            if (data.max_fill) {
                setCurrentFill(data.current_fill);
                setCurrentPrizePool(data.current_prizePool)
            }
            else {
                setContestType((data.data).toLowerCase())
            }
        } catch (err) {
            setError(err.message);
        }
    }, [match_id, contest_id]);


    const fetchContests = useCallback(async () => {
        try {
            server.pathname = `/api/live/contest/${match_id}`
            const res = await fetch(server, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Something went wrong");

            if (!data?.contest) {
                throw new Error("The contest will come soon");
            }

            let contest_data = data.contest.filter(contestData => contest_id.includes(parseInt(contestData.contest_id)));
            setContests(contest_data[0]);
            set_prize_detail(contest_data[0])
        } catch (err) {
            setError(err.message);
        } 
    }, [match_id, contest_id]);

    useEffect(() => {
        if ((!match_id || !/^\d+$/.test(match_id)) && (!contest_id || !/^\d+$/.test(contest_id))) {
            setError("Invalid or missing match ID");
            display_loading(false)
            setLoading(false)
            navigate("/matches");
            return;
        }
        const fetchAllData = () => {
            fetchMatchData();
            fetchContests();
            fetchRankings();
            setLoading(false)

        };
        if (!error) {
            fetchAllData();
            const interval = setInterval(fetchAllData, 30000);
            return () => clearInterval(interval);
        }
    }, [match_id, contest_id, fetchContests, fetchMatchData, fetchRankings, navigate, error])

    return (

        <>
            {loading ? display_loading(true) : error ? (
                <p className="error">{error.toLowerCase() === "invalid or expired token" ? navigate('/login') : display_error(error)}{display_loading(false)}</p>
            ) :
                (matchData && contests && prize_detail ? <> {display_loading(false)}<ViewLiveContestCard
                    matchData={matchData}
                    contests={contests}
                    prize_detail={prize_detail}
                    join={join}
                    currentPrizePoll={currentPrizePoll}
                    timeRemaining={"Live"}
                    currentFill={currentFill}
                    contestType={contestType}
                /></> : display_loading(true))}
        </>
    )
}

export default ViewLiveContest;