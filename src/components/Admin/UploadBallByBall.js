import React from "react";
import { useState, useEffect } from "react";
import { display_error, server } from "../../utils/utils";
import { useParams } from "react-router-dom";
import './BallForm.css';

export default function UploadBallByBall() {
    const { match_id } = useParams();
    const [oversData, setOversData] = useState([]);
    const [apiOversData, setApiOversData] = useState("");
    const [openOvers, setOpenOvers] = useState("")
    const [matchInfo, setMatchInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedKey, setSelectedKey] = useState("8c2f175bb9msh42d2c4435c1685cp15de67jsnf4fa85f71f8a")
    const [error, setError] = useState("");
    const [runTable, setRunTable] = useState(0)
    const [formData, setFormData] = useState({
        innings: "",
        over_number: "",
        bowler: "",
        over_breakdown: "",
        team_name: "",
        runs: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTeamChange = (e) => {
        setFormData({ ...formData, team_name: e.target.value });
    };

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const infoAPI = new URL(server);
                infoAPI.pathname = `/admin/live_match/${match_id}/info/`;

                const response = await fetch(infoAPI.toString(), {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("auth_token") || "",
                    },
                });
                const jsonData = await response.json();

                if (!response.ok) throw new Error(jsonData.error);
                if (!jsonData || !jsonData.oversData || !jsonData.matchInfo) {
                    throw new Error(jsonData.error);
                }
                const oversData = jsonData.oversData;
                const infoData = jsonData.matchInfo[0];
                setOpenOvers(jsonData.openOver[0])
                if (!oversData[0].status) {
                    setOversData(Array.isArray(oversData) ? oversData : []);

                }
                setMatchInfo(infoData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching match data:", err);
                setError(err.message);
                setLoading(false);
            }
        };
        if (!error) {
            fetchMatchData();
            const interval = setInterval(fetchMatchData, 10000);
            return () => clearInterval(interval);
        }
    }, [match_id, runTable, error])

    const getOvers = async () => {
        if (!formData.over_number || !formData.innings) {
            display_error("Fill all the fields");
            return;
        }

        try {
            const overAPI = new URL(server);
            overAPI.pathname = `/admin/live/over/${match_id}/${formData.innings}/${formData.over_number}`;

            const response = await fetch(overAPI.toString(), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.error);

            setFormData({
                ...formData,
                runs: data.runs,
                team_name: data.team,
                bowler: data.bowler,
                over_breakdown: data.overs.join(" "),
            });
        } catch (err) {
            console.error("Error fetching over data:", err);
            display_error(err.message);
        }
    };

    const add_overBreakDown = () => {
        // Convert over_breakdown to uppercase
        const overBreakdown = formData.over_breakdown.toUpperCase();
        const overs = overBreakdown.split(" ");
        let sum_runs = 0;

        overs.forEach((run) => {
            const runValue = parseInt(run);
            if (!isNaN(runValue)) {
                sum_runs += runValue;
            } else if (run === "WB" || run === "NB") {
                sum_runs += 1; // Add 1 run for wide ball, leg bye, or no ball
            } else if (run === "W" || run === "LB") {
                // Wicket, no runs added
            } else {
                display_error(`${run} is Invalid`);
            }
        });

        // Update the formData state with the calculated runs
        setFormData({
            ...formData,
            runs: sum_runs,
            over_breakdown: overBreakdown, // Ensure breakdown is in uppercase
        });
    };

    const sendModifiedData = async () => {

        setFormData({
            ...formData,
            bowler: formData.bowler
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
        });
        try {
            let wickets = 0;
            let overBreakdown = formData.over_breakdown.toUpperCase();
            let overs_check = overBreakdown.split(" ");

            overs_check.forEach(ball => {
                const runValue = parseInt(ball);
                if (ball.toLowerCase() === "w") {
                    wickets += 1;
                }
                else if (!isNaN(runValue) || ball === "WB" || ball === "NB" || ball === "LB") {
                    console.log(ball);
                }
                else {
                    throw new Error(`Invalid Ball ${ball}`);

                }
            });

            const modifiedData = {
                innings: formData.innings,
                over_number: formData.over_number,
                bowler: formData.bowler,
                overs: overs_check,
                team_name: formData.team_name,
                runs: String(formData.runs),
                team: formData.team_name,
                wickets: String(wickets)
            };




            const sendAPI = new URL(server);
            sendAPI.pathname = `/admin/live/over/${match_id}/update/`;

            const response = await fetch(sendAPI.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
                body: JSON.stringify(modifiedData),
            });

            const responseData = await response.json();

            if (!response.ok) throw new Error(responseData.error);

            display_error("Data updated successfully!");
            console.log("Data sent successfully:", responseData);
            setRunTable(runTable + 1)
            // Refetch overs data to re-render the table
        } catch (err) {
            console.error("Error sending modified data:", err);
            display_error(err.message);
        }
    };
    async function fetchOversFromAPi() {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': selectedKey,//vignesh :8c2f175bb9msh42d2c4435c1685cp15de67jsnf4fa85f71f8a //ama : d8a433c819msh5f6984e6e8d52d2p10084fjsn90afec517a0a //thaya:5beed19ad2mshfedc45ca698b32ep1e1644jsnf4cb628a6065  453326: 7bd5c8ca5amsh8d14f218e111023p1b6fcejsn7a1117337a5f
                'x-rapidapi-host': 'cricket-live-line1.p.rapidapi.com'
            }
        };
        const url_for_overs = `https://cricket-live-line1.p.rapidapi.com/match/${match_id}/overHistory`;
        const over_result = await fetch(url_for_overs, options);
        const over = await over_result.json();
        if (over?.data) {
            setApiOversData(JSON.stringify(over.data, null, 2))
        }
        else {
            setApiOversData(over)
        }

    }

    async function CloseOver() {
        try {
            let Confirmation = window.confirm("Are you sure to End Over " + openOvers.over_number)
            if (!Confirmation) {
                throw new Error("Canceled");

            }
            server.pathname = `/admin/close_over/${match_id}`
            const response = await fetch(server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });
            let result = await response.json()
            if (!response.ok) throw new Error(result.error);
            display_error(result.msg)
            setRunTable(runTable + 1)
        } catch (err) {
            display_error(err.message)
        }
    }

    async function SwitchInnings() {
        try {
            let Confirmation = window.confirm("Are you sure to Switch Innings" + openOvers.innings)
            if (!Confirmation) {
                throw new Error("Canceled");

            }
            server.pathname = `/admin/switch_innings/${match_id}`
            const response = await fetch(server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });
            let result = await response.json()
            if (!response.ok) throw new Error(result.error);
            display_error(result.msg)
            setRunTable(runTable + 1)
        } catch (err) {
            display_error(err.message)
        }
    }
    async function endMatch() {
        try {
            let Confirmation = window.confirm("Are you sure to End the Match")
            if (!Confirmation) {
                throw new Error("Canceled");
            }
            server.pathname = `/admin/end-match/${match_id}`
            const response = await fetch(server, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("auth_token") || "",
                },
            });
            let result = await response.json()
            if (!response.ok) throw new Error(result.error);
            display_error(result.msg)
        } catch (err) {
            display_error(err.message)
        }
    }

    return (
        <>
            {loading ? (
                <p>Loading....</p>
            ) :
                error ? <p> {display_error(error)}</p> :
                    (
                        <>
                            <div className="ball_forms_con">
                                <div className="ball_forms">
                                    <label>Innings:</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={formData.innings}
                                        onChange={handleChange}
                                        placeholder="Innings"
                                        name="innings"
                                    />
                                    <label>Over:</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={formData.over_number}
                                        onChange={handleChange}
                                        placeholder="Over Number"
                                        name="over_number"
                                    />

                                    <button onClick={getOvers}>Get Over</button>

                                    <label>Team:</label>
                                    <div>
                                        <label>
                                            <input
                                                type="radio"
                                                name="team_name"
                                                value={matchInfo?.team_a_short || "Not Found"}
                                                checked={formData?.team_name === `${matchInfo?.team_a_short || "Not Found"}`}
                                                onChange={handleTeamChange}
                                            />
                                            {matchInfo?.team_a_short || "Not Found"}
                                        </label>
                                        &nbsp;&nbsp;
                                        <label>
                                            <input
                                                type="radio"
                                                name="team_name"
                                                value={matchInfo?.team_b_short || "Not Found"}
                                                checked={formData.team_name === `${matchInfo?.team_b_short || "Not Found"}`}
                                                onChange={handleTeamChange}
                                            />
                                            {matchInfo?.team_b_short || "Not Found"}
                                        </label>
                                    </div>

                                    <label>Bowler Name:</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={formData.bowler}
                                        onChange={handleChange}
                                        placeholder="Bowler Name"
                                        name="bowler"
                                    />
                                    <label>Over BreakDown:</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={formData.over_breakdown}
                                        onChange={handleChange}
                                        placeholder="Over BreakDown"
                                        name="over_breakdown"
                                    />
                                    <button className="add_runs" onClick={add_overBreakDown}>Add</button>
                                    <label>Runs:</label>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        value={formData.runs}
                                        onChange={handleChange}
                                        placeholder="Runs"
                                        name="runs"
                                    />

                                    <button onClick={sendModifiedData}>Send Modified Data</button>
                                </div>
                                <div className="balls_from_api">
                                    <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
                                        <option value="8c2f175bb9msh42d2c4435c1685cp15de67jsnf4fa85f71f8a">Key 1</option>
                                        <option value="d8a433c819msh5f6984e6e8d52d2p10084fjsn90afec517a0a">Key 2</option>
                                        <option value="5beed19ad2mshfedc45ca698b32ep1e1644jsnf4cb628a6065">Key 3</option>
                                        <option value="7bd5c8ca5amsh8d14f218e111023p1b6fcejsn7a1117337a5f">Key 4</option>
                                    </select>

                                    <textarea value={apiOversData} readOnly>

                                    </textarea>
                                    <button onClick={fetchOversFromAPi}>Fetch Overs</button>
                                </div>
                                <div className="set_open_overs">
                                    <button onClick={CloseOver}>{`Close Over ${openOvers.over_number}`}</button>
                                    <button onClick={SwitchInnings}>{`End Innings ${openOvers.innings}`}</button>
                                    <button onClick={endMatch}>{`End Match`}</button>

                                </div>
                            </div>

                            <div className="live_game_con">
                                <h3 className="text-xl font-semibold mb-2">Overs Data</h3>
                                {oversData.length > 0 ? <>
                                    {oversData[0][2] ? <>
                                        <div className="innings_header">Innings 2</div>
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border p-2">Over</th>
                                                    <th className="border p-2">Bowler</th>
                                                    <th className="border p-2">Runs</th>
                                                    <th className="border p-2">Over Breakdown</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!oversData.length ? <></> : <>
                                                    {oversData[0][2].map((over, index) => (
                                                        <tr key={`${index}`} className="border">
                                                            <td className="border p-2">{over?.over_number}</td>
                                                            <td className="border p-2">{over?.bowler || "N/A"}</td>
                                                            <td className="border p-2">{over?.runs || "0"}</td>
                                                            <td className="border p-2">{over?.overs?.join(" ") || "N/A"}</td>
                                                        </tr>
                                                    ))}

                                                </>}
                                            </tbody>
                                        </table> </> : ""}
                                    {oversData[0][1] ? <>
                                        <div className="innings_header">Innings 1</div>
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border p-2">Over</th>
                                                    <th className="border p-2">Bowler</th>
                                                    <th className="border p-2">Runs</th>
                                                    <th className="border p-2">Over Breakdown</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {!oversData.length ? <></> : <>
                                                    {oversData[0][1]?.map((over, index) => (
                                                        <tr key={`${index}`} className="border">
                                                            <td className="border p-2">{over?.over_number}</td>
                                                            <td className="border p-2">{over?.bowler || "N/A"}</td>
                                                            <td className="border p-2">{over?.runs || "0"}</td>
                                                            <td className="border p-2">{over?.overs?.join(" ") || "N/A"}</td>
                                                        </tr>
                                                    ))}

                                                </>}
                                            </tbody>
                                        </table> </> : ""}

                                </> :
                                    <>
                                        <div className="innings_header">Innings 1</div>
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="border p-2">Over</th>
                                                    <th className="border p-2">Bowler</th>
                                                    <th className="border p-2">Runs</th>
                                                    <th className="border p-2">Over Breakdown</th>
                                                </tr>
                                            </thead>

                                        </table>


                                    </>}

                            </div>
                        </>
                    )}
        </>
    );
}