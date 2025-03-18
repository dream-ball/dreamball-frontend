import React, { useEffect, useState } from "react";
import { server } from "../../utils/utils";
import MatchCard from "../Matches/MatchCard";
export default function LiveMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        async function fetchLiveMatches() {
            try {
                server.pathname = '/admin/live/matches'
                const response = await fetch(server);
                if (!response.ok) {
                    throw new Error("Failed to fetch live matches");
                }
                const data = await response.json();
                setMatches(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchLiveMatches();
    }, []);

    if (loading) return <p>Loading live matches...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Live Matches</h1>
            <ul>
                {matches.map((match) => (
                    <MatchCard key={match.match_id} match={JSON.parse(match.match_data)} path={`/admin/live/match/${match.match_id}`} />
                ))}
            </ul>
        </>
    );
}
