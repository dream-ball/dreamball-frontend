import React from "react";
export default function LiveMatchCard({ match_data, overs_data, match_info }) {
    return (
        <>
            {match_data.length === 0 || overs_data.length === 0 || overs_data[0].status ? <>
                <div className="live_match_card">
                    <div className="status_data">
                        <div className="live">
                            <p><span>• </span>Live</p>
                        </div>
                        <div className="venue">{match_data.series}</div>
                    </div>
                    <div className="match_data">
                        <div className="teams team_1">
                            <div className="img_con">
                                <img src={match_data.team_a_img} alt=""></img>
                            </div>
                            <div className="team_nick">{match_data.team_a_short} </div>
                            <div className="status">
                                <div className="score">{'0-0'}</div>
                                <div className="overs">({'0.0'})</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="teams team_2">
                            <div className="img_con">
                                <img src={match_data.team_b_img} alt=""></img>
                            </div>
                            <div className="team_nick">{match_data.team_b_short}
                            </div>
                            <div className="status">
                                <div className="score">{'0-0'}</div>
                                <div className="overs">({'0.0'})</div>
                            </div>
                        </div>
                    </div>
                </div>
            </> :
                <div className="live_match_card">
                    <div className="status_data">
                        <div className="live">
                            <p><span>• </span>Live</p>
                        </div>
                        <div className="venue">{match_info.series}</div>

                    </div>
                    <div className="match_data">
                        <div className="teams team_1">
                            <div className="img_con">
                                <img src={match_info.team_a_img} alt=""></img>
                            </div>
                            <div className="team_nick">{match_info.team_a_short} * <span>{parseInt(match_info.balling_team) === match_info.team_a_id ? "⚾" : '🏏'} </span>
                            </div>
                            <div className="status">
                                <div className="score">{match_info.team_a_scores ? match_info.team_a_scores : '0-0'}</div>
                                <div className="overs">({match_info.team_a_over ? match_info.team_a_over : '0.0'})</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="teams team_2">
                            <div className="img_con">
                                <img src={match_info.team_b_img} alt=""></img>
                            </div>
                            <div className="team_nick">{match_info.team_b_short} *<span>{parseInt(match_info.balling_team) === match_info.team_b_id ? "⚾" : '🏏'}</span>
                            </div>
                            <div className="status">
                                <div className="score">{match_info.team_b_scores ? match_info.team_b_scores : '0-0'}</div>
                                <div className="overs">({match_info.team_b_over ? match_info.team_b_over : '0.0'})</div>
                            </div>
                        </div>
                    </div>
                    <div className="ball_details">
                        <div className="ball_con">
                            {overs_data[0][Object.keys(overs_data[0]).length].at(0).overs.map((overs, index) => {
                                return <div className={'_' + overs} key={index}><p>{overs}</p></div>
                            })}
                            <div className="over_on">Over ({parseInt(match_info.balling_team) === match_info.team_a_id ? match_info.team_b_over : match_info.team_a_over})</div>

                        </div>
                    </div>
                </div>}
        </>
    )
};
