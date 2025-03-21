import React, { useState } from 'react';
import "./ViewContest.css";
import { prize_data, formatNumber } from "../../../utils/utils";
import practiceImg from './practice.png'
import { useNavigate } from "react-router-dom";


const ViewContestCard = ({ matchData, contests, prize_detail, registerContest, join, timeRemaining, maxFill, currentFill, contestType, currentPrizePool, leaderBoard, playersCount }) => {
  const navigate = useNavigate();
  const [activeHeader, setActiveHeader] = useState('ranking');
  const [activeFiller, setActiveFiller] = useState('max');
  const handleHeaderClick = (header) => setActiveHeader(header);
  const handleFillerClick = (filler) => setActiveFiller(filler);
  const percentFilled = Math.min(100, ((contests.total_spots - contests.spots_available) / contests.total_spots) * 100);
  let prize_details = prize_data(prize_detail.contest_id, JSON.parse(prize_detail.prize_order), prize_detail.total_spots, prize_detail.spots_available, prize_detail.entry_fee)
  return (
    <>
      <div className="view_exit" onClick={() => (navigate(-1))}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24">
          <path d="m3.293 11.293 1.414 1.414L11 6.414V20h2V6.414l6.293 6.293 1.414-1.414L12 2.586l-8.707 8.707z" />
        </svg>
      </div>
      <div className="head_view">
        <div className="teams">
          <div className="team_nick">
            <p className="f_team" id="team1_nick">{matchData.team_a_short}</p>
            <div className="view_vs vs">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-40 0 275 183"
                preserveAspectRatio="xMidYMid meet" height="100%" width="100%">
                <path
                  d="M0 0 C64.35 0 128.7 0 195 0 C195 82.83 195 165.66 195 251 C130.65 251 66.3 251 0 251 C0 168.17 0 85.34 0 0 Z "
                  fill="#730000" fillOpacity="0" transform="translate(0,0)" />
                <path
                  d="M0 0 C1.65 0 3.3 0 5 0 C5.05444001 3.00024947 5.0938836 5.99949039 5.125 9 C5.14175781 9.83917969 5.15851563 10.67835937 5.17578125 11.54296875 C5.25593456 21.8827458 2.57900947 31.47825328 -4.125 39.5625 C-6.65695357 41.5036644 -8.94485076 41.98987055 -12.0625 42.5625 C-17.23269107 41.82390128 -19.4883407 39.44720576 -23.37890625 36.11328125 C-28.12998464 32.28268004 -33.21365921 29.60097547 -39.1875 28.3125 C-43.4596509 29.35680355 -45.87580681 32.02291008 -49 35 C-50.11810273 35.92506706 -51.24261767 36.84246871 -52.375 37.75 C-55.02526413 39.72714742 -55.02526413 39.72714742 -56 42 C-56.5215389 48.88623551 -56.5215389 48.88623551 -54 55 C-48.32484587 58.00745418 -42.10110886 58.19454068 -35.8125 58.4375 C-25.14852547 58.85385763 -14.75874075 60.47806822 -6 67 C-2 71.42105263 -2 71.42105263 -2 74 C-1.01 74 -0.02 74 1 74 C1.7346075 83.10913301 -1.09371133 88.76512222 -6.1875 96.1875 C-11.79402897 101.79402897 -18.19681274 105.64370347 -25.25 109.1875 C-31.87596765 112.64859369 -37.08872176 117.1296234 -42.66015625 122.06640625 C-54.94901336 132.95282603 -69.15262662 141.68764789 -86 141 C-83.23428468 138.02941688 -80.50278604 136.02731729 -77 134 C-77.8206897 134.3853894 -77.8206897 134.3853894 -78.65795898 134.77856445 C-89.45969819 139.78975035 -99.47404835 143.89322494 -111.3359375 145.3671875 C-115.35512235 146.06133243 -118.29740266 147.33586063 -122 149 C-124.9375 149.1875 -124.9375 149.1875 -127 149 C-126.1458162 145.26294586 -124.90721465 143.92236328 -121.9375 141.4375 C-115.02991509 137.39528364 -104.95554238 135 -97 135 C-97.495 134.01 -97.495 134.01 -98 133 C-98.886875 133.495 -99.77375 133.99 -100.6875 134.5 C-103.87586238 135.94378674 -105.58187546 136.30159922 -109 136 C-105.83047153 132.73991357 -102.60062011 129.77762123 -99 127 C-99.74765625 127.27714844 -100.4953125 127.55429688 -101.265625 127.83984375 C-102.25046875 128.20207031 -103.2353125 128.56429687 -104.25 128.9375 C-105.71179688 129.47697266 -105.71179688 129.47697266 -107.203125 130.02734375 C-109.46457161 130.81379655 -111.66796552 131.47251601 -114 132 C-114 132.66 -114 133.32 -114 134 C-116.31 134 -118.62 134 -121 134 C-119.94128554 127.64771323 -119.94128554 127.64771323 -118 125 C-115.12890625 124.53125 -115.12890625 124.53125 -111.5625 124.5 C-104.83161144 124.18870505 -98.94383861 123.32685441 -93 120 C-90.73083907 117.22132295 -90.73083907 117.22132295 -89 114 C-81.7786117 106.24977266 -72.0485746 100.44752086 -62.25 96.625 C-51.07928913 92.22216323 -39.94563273 86.10840825 -32 77 C-31.34 76.67 -30.68 76.34 -30 76 C-30.66 74.35 -31.32 72.7 -32 71 C-33.19375244 70.89510254 -33.19375244 70.89510254 -34.41162109 70.78808594 C-38.0676964 70.45779126 -41.72115354 70.10406904 -45.375 69.75 C-46.62667969 69.64042969 -47.87835938 69.53085938 -49.16796875 69.41796875 C-59.74170648 68.36613097 -69.71422793 66.3552432 -77 58 C-79.66377153 50.00868542 -78.68308482 40.5190524 -75 33 C-68.7457766 21.68005047 -58.8022038 12.04818688 -46.50732422 7.6003418 C-39.90120473 6.01860394 -32.81348425 6.5640622 -26.06054688 6.56054688 C-18.32948342 6.44310275 -11.83184535 5.40645768 -4.51831055 2.85522461 C-2 2 -2 2 0 2 C0 1.34 0 0.68 0 0 Z "
                  fill="#bbbbbb" transform="translate(165,70)" />
                <path
                  d="M0 0 C0.33 0 0.66 0 1 0 C1.29130861 4.09288594 0.53098586 6.34334125 -1.5 9.875 C-3.77822584 14.18187077 -4.38655154 17.07146784 -4 22 C-4.28520405 23.67557379 -4.59955696 25.34817245 -5 27 C-4.67 26.34 -4.34 25.68 -4 25 C-3.01 25 -2.02 25 -1 25 C-1 26.98 -1 28.96 -1 31 C-2.32 31 -3.64 31 -5 31 C-5.14115234 32.75183594 -5.14115234 32.75183594 -5.28515625 34.5390625 C-5.83974121 38.91615071 -7.37247123 42.50605521 -9.4375 46.375 C-9.78876953 47.05780029 -10.14003906 47.74060059 -10.50195312 48.4440918 C-12.80863777 52.88284949 -15.25545661 57.2352128 -17.73193359 61.58081055 C-26.29299972 76.6475617 -32.74908911 92.18366054 -37 109 C-37.24806396 109.94705811 -37.49612793 110.89411621 -37.75170898 111.86987305 C-40.14912619 121.50738717 -40.99329773 131.09110981 -41.72851562 140.97460938 C-41.83744141 142.21146484 -41.94636719 143.44832031 -42.05859375 144.72265625 C-42.14423584 145.83390869 -42.22987793 146.94516113 -42.31811523 148.09008789 C-43.12822653 151.54720085 -44.2415861 152.82182976 -47 155 C-50.46630907 155.9838369 -53.51974018 155.92108303 -57 155 C-59.00725369 153.20084172 -60.26458333 151.3894117 -61.6875 149.10546875 C-62.91495222 147.13643081 -64.13593271 145.71107076 -65.8125 144.125 C-68.02796827 141.97283082 -68.92452509 141.06028602 -69.1418457 138.00732422 C-69.15304443 137.1979541 -69.16424316 136.38858398 -69.17578125 135.5546875 C-69.51950719 120.76788741 -71.06889611 107.64842856 -77.265625 94.015625 C-78 92 -78 92 -78 88 C-79.32 88 -80.64 88 -82 88 C-82.38671875 87.01 -82.7734375 86.02 -83.171875 85 C-88.62343508 70.79459524 -88.62343508 70.79459524 -98 59 C-100.3556435 51.9330695 -99.10404625 46.21134394 -95.875 39.65234375 C-95.58625 39.10707031 -95.2975 38.56179687 -95 38 C-94.01 38 -93.02 38 -92 38 C-92 36.68 -92 35.36 -92 34 C-86.63904667 32.87137825 -81.44693314 32.90311779 -76 33 C-75.67 33.99 -75.34 34.98 -75 36 C-74.21625 36.515625 -73.4325 37.03125 -72.625 37.5625 C-69.86149476 40.12861201 -69.45722289 41.04991239 -68.48046875 44.5390625 C-68.22910156 45.43407471 -67.97773437 46.32908691 -67.71875 47.2512207 C-66.6283546 51.42131642 -65.64311006 55.60976184 -64.6875 59.8125 C-62.9029329 67.46817495 -60.95341682 75.06104149 -58.8125 82.625 C-58.56266357 83.51936768 -58.31282715 84.41373535 -58.05541992 85.33520508 C-57.81670166 86.16560303 -57.5779834 86.99600098 -57.33203125 87.8515625 C-57.12296143 88.58197754 -56.9138916 89.31239258 -56.69848633 90.06494141 C-55.9861668 92.27993795 -55.9861668 92.27993795 -54 95 C-53.80256699 94.43418213 -53.60513397 93.86836426 -53.40171814 93.28540039 C-51.31576249 87.31131735 -49.22095239 81.34038962 -47.12133789 75.37109375 C-46.34244338 73.15311574 -45.56569069 70.93438421 -44.79125977 68.71484375 C-31.64573556 31.054234 -31.64573556 31.054234 -22.8203125 24.3828125 C-20.87362574 23.11533726 -20.87362574 23.11533726 -20 21 C-19.01 21 -18.02 21 -17 21 C-17 21.99 -17 22.98 -17 24 C-16.01 24 -15.02 24 -14 24 C-13.90074219 23.28457031 -13.80148438 22.56914063 -13.69921875 21.83203125 C-11.76449495 13.99585943 -5.2112054 6.10305599 0 0 Z "
                  fill="#bbbbbb" transform="translate(119,13)" />
              </svg>
            </div>
            <p className="s_team" id="team2_nick">{matchData.team_b_short}</p>
          </div>
        </div>
        <div className="time" id="time_left">
          {timeRemaining ? timeRemaining : "00 : 00"}
        </div>
      </div>
      <div className="view_con">
        <div className="view_main_con">
          <div className="view view_cnt_card" id="1">
            <div className="card">
              <div className="prize_pool_tag">
                {currentPrizePool && contests.entry_fee!==0 ? <p>Current Prize Pool</p> : ""}
                <p>{contests.entry_fee === 0 ? null : "Max Prize Pool"}</p>
              </div>
              <div className="total_prize">
                {currentPrizePool && contests.entry_fee !==0 ? <div>₹{formatNumber(currentPrizePool)}</div> : ""}
                <div>{ contests.entry_fee !==0 ?`₹${formatNumber(contests.prize_pool)}`:"Practice Contest"}</div>
              </div>
              <div className="filled_bar">
                <div className="spots">
                  <p id="spots_left_1" value="11" className="left">{contests.spots_available} <span>left</span></p>
                  <p id="total_spots_1" value="12" className="total">{contests.total_spots} <span>spots</span></p>
                </div>
                <div className="filler">
                  <div className="inc_filler" id="inc_filler_1" style={{ width: `${percentFilled}%` }}></div>
                </div>
              </div>
              <div contest_id="1" className={`entry ${contests.spots_available === 0 ? "full" : ""} ${join === true ? 'joined' : ''}`} onClick={() => contests.spots_available > 0 && join !== true && registerContest(contests.contest_id)}>{join !== true ? contests.spots_available > 0 ? `${contests.entry_fee === 0 ? "Free" : `JOIN ₹${contests.entry_fee}`}` : "FULL" : 'JOINED'}</div>
            </div>

            <div className="prize">
              <div className="top_prize">🥇</div>
              <div className="amt">
                <p>Prize: {prize_details["max_prize"] === 0 ? "Glory" : `₹${prize_details["max_prize"]}`}</p>
              </div>
              <div className="amt">
                <div className="prz_img">🏆</div>
                <p>Winners: {prize_details["winners_percentage"]}</p>
              </div>
            </div>

            <div className="prize_table">
              <div className="menu_op">
                <div className="view_header">
                  <div
                    className={`ranking ${activeHeader === 'ranking' ? 'active' : ''}`}
                    onClick={() => {

                      let ranking_board = document.getElementById("ranking_board")
                      let players_board = document.getElementById("players_board")
                      ranking_board.style.display = "block"
                      players_board.style.display = "none"
                      handleHeaderClick('ranking')
                    }
                    }>
                    Ranking<span></span>
                  </div>
                  <div
                    className={`leader_board ${activeHeader === 'leaderboard' ? 'active' : ''}`}
                    onClick={() => {

                      let ranking_board = document.getElementById("ranking_board")
                      let players_board = document.getElementById("players_board")
                      ranking_board.style.display = "none"
                      players_board.style.display = "block"
                      handleHeaderClick('leaderboard')
                    }}>
                    Leaderboard<span></span>
                  </div>
                </div>
              </div>
            </div>
            {contestType === "practice contest" ? <div className='ranking_board' id="ranking_board">
              <h3 className='practice_head'>Winner Takes All</h3>
              <div className='practice_img'>
                <img src={practiceImg} alt='Practice img'></img>
              </div>

            </div> :
              <div className='ranking_board' id="ranking_board">
                <div className="filler_options">
                  <div className="filler_con">
                    <div
                      className={`max ${activeFiller === 'max' ? 'active' : ''}`}
                      onClick={() => {
                        let max_fill = document.getElementById('max_fill');
                        max_fill.style.display = "block"
                        let current_fill = document.getElementById('current_fill');
                        current_fill.style.display = "none"
                        handleFillerClick('max')
                      }
                      }
                    >
                      Max Fill
                    </div>
                    <div
                      className={`current ${activeFiller === 'current' ? 'active' : ''}`}
                      onClick={() => {
                        handleFillerClick('current')
                        let max_fill = document.getElementById('max_fill');
                        max_fill.style.display = "none"
                        let current_fill = document.getElementById('current_fill');
                        current_fill.style.display = "block"

                      }}>
                      Current Fill
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div id='max_fill' className='max_fill'>
                    <div className="rank_header">
                      <div>RANK</div>
                      <div>WINNINGS</div>
                    </div>

                    {maxFill.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="rank">{item.rank}</div>
                        <div className="winnings">₹{formatNumber(item.winnings)}</div>
                      </div>
                    ))}
                  </div>
                  {!currentFill.length ? <div className='current_fill' id="current_fill" style={{ width: "100%", padding: "20px 0px" }}>
                    <div className='no_fill_msg'>{"Winners will be added soon...!"}</div>
                  </div> : <div id='current_fill' className='current_fill '>
                    <div className="rank_header">
                      <div>RANK</div>
                      <div>WINNINGS</div>
                    </div>
                    {currentFill.map((item, index) => (
                      <div className="row" key={index}>
                        <div className="rank">{item.rank}</div>
                        <div className="winnings">₹{formatNumber(item.winnings)}</div>
                      </div>
                    ))}
                  </div>}

                </div>
              </div>
            }
            <div className='players_board' id="players_board">
              <div className='teams_count'>
                <p className='info'>Joined Player({formatNumber(playersCount)})</p>
              </div>
              <div className='player_con'>
                {leaderBoard.length === 0 ?
                  <div className='current_fill' id="current_fill" style={{ width: "100%", padding: "20px 0px" }}>
                    <div className='no_fill_msg'>{"Waiting for Players...!"}</div>
                  </div>
                  : <>
                    <div className="flex-table">
                      <div className="flex-row table-header">
                        <div className="flex-cell">Rank</div>
                        <div className="flex-cell">Players</div>
                        <div className="flex-cell">Points</div>
                      </div>
                      {leaderBoard.length === 0 ? <></> : <>
                        {leaderBoard.map(player => {
                          return (
                            <div className="flex-row">
                              <div className="flex-cell">1</div>
                              <div className="flex-cell">
                                <div className='user_con'>
                                  <div className='lBoard_user_profile'>
                                    <img src={player.user_profile} alt='user'></img>
                                  </div>
                                  <div className='user_data'>
                                    <span>{player.user_name}</span>
                                    {/* <span>${formatNumber(100)}</span> */}
                                  </div>
                                </div>
                              </div>
                              <div className="flex-cell">1000</div>
                            </div>
                          )


                        })}

                      </>}



                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewContestCard;
