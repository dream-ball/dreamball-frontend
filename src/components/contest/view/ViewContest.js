import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server, display_error, display_loading, timeLeft } from "../../../utils/utils";
import ViewContestCard from "./ViewContestCard";
function ViewContest() {
    const { id, contest_id } = useParams();
    const navigate = useNavigate();
    const [matchData, setMatchData] = useState(null);
    const [contests, setContests] = useState(null);
    const [prize_detail, set_prize_detail] = useState(null);
    const [maxFill, setMaxFill] = useState([])
    const [currentFill, setCurrentFill] = useState([])
    const [contestType, setContestType] = useState([])
    const [currentPrizePool,setCurrentPrizePool] =useState([])
    const [playersCount,setPlayersCount]=useState(0)
    const [leaderBoard,setLeaderBoard]=useState([])
    const [join, setJoin,] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const fetchMatchData = useCallback(async () => {
        try {
            server.pathname = `/api/match/${id}`
            const res = await fetch(server, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Something went wrong");
            setMatchData(data);
        } catch (err) {
            setError(err.message);
        }
        finally {
        }
    }, [id]);

    const fetchRegisteredMatchData = useCallback(async () => {
        try {
            server.pathname = `/api/user/contest/${id}`
            const res = await fetch(server, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });


            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Something went wrong");
            if (!data.msg) {
                let contest_data = data.filter(contestData => contest_id.includes(parseInt(contestData.contest_id)));
                if (contest_data.length) {
                    setJoin(true);
                }
            }

        } catch (err) {
            setError(err.message);
        }
    }, [id, contest_id]);



    const fetchRankings = useCallback(async () => {
        try {
            server.pathname = `/api/rankings/${id}/${contest_id}`
            const res = await fetch(server, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Something went wrong");
            setLeaderBoard(data.leaderBoard.players);
            setPlayersCount(data.leaderBoard.players_count)
            if (data.max_fill) {
                setMaxFill(data.max_fill);
                setCurrentFill(data.current_fill);
                setCurrentPrizePool(data.current_prizePool)
            }
            else {
                setContestType((data.data).toLowerCase())
            }

        } catch (err) {
            setError(err.message);
        }
    }, [id, contest_id]);

    const fetchContests = useCallback(async () => {
        try {
            server.pathname = `/api/contest/${id}`
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
        } finally {
        }
    }, [id, contest_id]); // ✅ Dependency: `id`

    useEffect(() => {
        if (!id || !/^\d+$/.test(id)) {
            setError("Invalid or missing match ID");
            display_loading(false)
            setLoading(false)
            navigate("/matches");
            return;
        }
        // Function to fetch all data
        const fetchAllData = () => {
            fetchMatchData();
            fetchContests();
            fetchRegisteredMatchData();
            fetchRankings();
            setLoading(false)

        };
        if (!error) {
            fetchAllData();
            const interval = setInterval(fetchAllData, 30000);
            return () => clearInterval(interval);
        }        // Cleanup on unmount
    }, [id, contest_id, fetchContests, fetchRegisteredMatchData, fetchMatchData, fetchRankings, navigate, error]);


    const [timeRemaining, setTimeRemaining] = useState(() =>
        matchData ? timeLeft(matchData.match_time, matchData.date_wise) : null
    );

    useEffect(() => {
        if (!error) {
            if (!matchData?.match_time) return;
            const interval = setInterval(() => {
                setTimeRemaining(
                    timeLeft(matchData.match_time, matchData.date_wise)
                );
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [matchData, error]);

    async function registerContest(contestId) {
        document.getElementById("loading_container2").style.display = "block"
        try {
            server.pathname = `/api/register/contest/${contestId}`
            const res = await fetch(server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
                body: JSON.stringify({ match_id: id }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg);

            setTimeout(() => {
                document.getElementById("loading_container2").style.display = "none"
                fetchContests();
                fetchRegisteredMatchData();
            }, 500);

        } catch (err) {
            setTimeout(() => {
                document.getElementById("loading_container2").style.display = "none"
                display_error(err.message)
                fetchContests();
                fetchRegisteredMatchData();
            }, 500);

        }
    }

    return (

        <>
            {loading ? display_loading(true) : error ? (
                <p className="error">{error.toLowerCase() === "invalid or expired token" ? navigate('/login') : display_error(error)}{display_loading(false)}</p>
            ) :
                (matchData && contests && prize_detail ? <> {display_loading(false)}<ViewContestCard
                    matchData={matchData}
                    contests={contests}
                    prize_detail={prize_detail}
                    join={join}
                    registerContest={registerContest}
                    currentPrizePool={currentPrizePool}
                    timeRemaining={timeRemaining}
                    leaderBoard={leaderBoard}
                    playersCount={playersCount}
                    maxFill={maxFill}
                    currentFill={currentFill}
                    contestType={contestType}
                /></> : display_loading(true))}
        </>
    )
}

export default ViewContest;