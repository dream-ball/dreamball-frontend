
import React, { useState, useEffect } from "react";
import { display_error, display_loading, server } from "../../../utils/utils";
import MatchCard from "../../Matches/MatchCard";

export default function History() {
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                server.pathname = '/api/my-matches/history'
                const res = await fetch(server, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("auth_token") ? `Bearer ${localStorage.getItem("auth_token")}` : "",
                    },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.msg || "Something went wrong");
                setHistory(data);
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
        <>
            {
                loading ? display_loading(true) : <>
                    {
                        history.length > 0 ? <>
                            {display_loading(false)}
                            {
                                <>
                                {console.log(history)}
                               { history.map(match=> <MatchCard match={match} path={'/'} type={"history"} />)}
                            </>
                            }


                        </> : null
                    }
                </>
            }

        </>

    )
};
