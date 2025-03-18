import { useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import "./utils/styles/Utils.css"
import Login from './components/Login/Login.js'
import RedirectOnLoad from "./Home.js";
import Contest from "./components/contest/Contest.js";
import LiveGame from "./components/liveGame/LiveGame.js";
import Matches from "./components/Matches/Matches.js";
// import ViewContest from "./components/contest/view/ViewContest.js";
import ViewContest from "./components/contest/view/ViewContest.js";
import Mymatches from "./components/Mymatches/Matches/Mymatches.js";
import NotFound from "./components/NotFound/NotFound.js";
import LiveContest from './components/liveGame/Contest/LiveContest.js'
import UploadBallByBall from "./components/Admin/UploadBallByBall.js";
import LiveMatchesUp from "./components/Admin/LiveMatchesUp.js";
import ViewLiveContest from "./components/liveGame/Contest/view/ViewLiveContest.js";


function App() {
    const location = useLocation(); // Get current route's location
    useEffect(() => {
        document.body.style.background = "";  // Reset the background
        document.body.style.color = "";  // Reset text color
        document.body.style.height = "";  // Reset height
        document.body.style.display = "";  // Reset display property
        document.body.style.justifyContent = "";  // Reset justifyContent
        document.body.style.alignItems = "";  // Reset alignItems

        if (location.pathname === "/login") {
            document.body.style.background = "linear-gradient(135deg, #6a11cb, #2575fc)";
            document.body.style.color = "#fff";
            document.body.style.height = "100vh";
            document.body.style.display = "flex";
            document.body.style.justifyContent = "center"
            document.body.style.alignItems = "center"
        } else {
        }
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<RedirectOnLoad />} />
            <Route path="/login" element={<Login />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/contest/:id/" element={<Contest />} />
            <Route path="/contest/:id/:contest_id" element={<ViewContest />} />
            <Route path="/livematch" element={<LiveGame />} />
            <Route path="/Mymatches" element={<Mymatches />} />
            <Route path="/live/contest/:match_id" element={<LiveContest />} />
            <Route path="/live/contest/:match_id/:contest_id" element={<ViewLiveContest />} />

            <Route path="/live/match/:match_id" element={<LiveGame />} />
            <Route path="/admin/live/match/:match_id" element={<UploadBallByBall />} />
            <Route path="/admin/live/" element={<LiveMatchesUp />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default function AppWrapper() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}