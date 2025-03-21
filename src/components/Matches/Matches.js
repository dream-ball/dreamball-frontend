import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MatchCard from "./MatchCard";
import Header from "./Header";
import './Matches.css';
import { server } from "../../utils/utils";
import { display_error, display_loading } from "../../utils/utils";
import MenuIcon from "../Menu/Menu";

export default function Matches() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(null);
  const [liveMatches, setLiveMatches] = useState(null);
  const [loading, setLoading] = useState(false);

console.log("hey its old server");

  useEffect(() => {
    const fetchMatches = async () => {
      display_loading(true);
      setLoading(true);

      try {
        // Fetch Live Matches
        server.pathname = "/api/my-matches/";
        const resLive = await fetch(server, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("auth_token")
              ? `Bearer ${localStorage.getItem("auth_token")}`
              : "",
          },
        });

        const liveData = await resLive.json();
        if (!resLive.ok) throw new Error(liveData.msg || "Something went wrong");

        // Validate live matches
        if (liveData.live_matches && !liveData.live_matches.status) {
          setLiveMatches(liveData.live_matches);
        }

        // Fetch Upcoming Matches
        server.pathname = "/api/matches";
        const resUpcoming = await fetch(server, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("auth_token")
              ? `Bearer ${localStorage.getItem("auth_token")}`
              : "",
          },
        });

        const upcomingData = await resUpcoming.json();
        if (!resUpcoming.ok) throw new Error(upcomingData.msg || "Something went wrong");

        // Handle Upcoming Matches
        if (upcomingData?.Failed) {
          if (upcomingData.Failed.toLowerCase() !== "no data found") {
            throw new Error(upcomingData.Failed);
          }
          setMatches(null);
        } else {
          setMatches(upcomingData);
        }

      } catch (error) {
        
        if ((error.message).toLowerCase() === "invalid or expired token") {
          navigate("/login");
        } else {
          display_error(error.message);
        }
      } finally {
        display_loading(false);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [navigate]);

  return (
    <div style={{ paddingBottom: "50px" }}>
      <MenuIcon />
      <Header />
      <section className="hero">
        <h2>Upcoming Cricket Matches</h2>
        <p className="tagline">Join the action and win big!</p>
      </section>

      <div style={{padding:"5px"}}>
        <div className="disclaimer-box">
          <i className="fas fa-exclamation-triangle"></i>
          <p>
            Disclaimer: This beta version may have bugs or incomplete features — please report issues
            <a href="mailto:support@dream-ball.com">here</a>.
          </p>
        </div>
      </div>
      {loading ? (
        display_loading(true)
      ) : (
        <div className="match">
          <div className="my_matches">

            {liveMatches?.length > 0 ? <><div className="upc_matches">
              <div>Current matches</div>
            </div>
              {liveMatches?.length > 0 ? (
                liveMatches.map((match) => <MatchCard key={match.match_id} match={match} path={`/live/contest/${match.match_id}`} />)
              ) : ""}</> : ""}

          </div>

          <div className="upc_matches">Upcoming matches</div>
          {matches?.length > 0 ? (
            matches.map((match) => <MatchCard key={match.match_id} match={JSON.parse(match.match_data)} />)
          ) : (
            <div className="no_matches_found">No upcoming matches found</div>
          )}
        </div>
      )}
    </div>
  );
}
