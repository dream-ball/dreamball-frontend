// const server = new URL(window.location.origin)
// server.protocol="http"
const server = new URL("https://api.dream-ball.com")
// server.port = 5000
function display_error(err_msg) {

  let con = document.getElementById("error-box")
  let div = document.createElement("div")
  let err_msg_temp = `<div class="error-message">
    <p>${err_msg}</p>
      <a class="error-close icon-cross" onclick="this.parentElement.style.display='none'">
        <svg fill="#947c00" height="512px" width="512px" viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="expanded">
            <g>
                <path d="M267.314,256l80.894-80.894c3.124-3.124,3.124-8.189,0-11.313c-3.125-3.124-8.189-3.124-11.314,0L256,244.686    
                l-80.894-80.894c-3.124-3.124-8.189-3.124-11.313,0c-3.125,3.124-3.125,8.189,0,11.313L244.686,256l-80.894,80.894    
                c-3.125,3.125-3.125,8.189,0,11.314c1.562,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343L256,267.314l80.894,80.894    
                c1.563,1.562,3.609,2.343,5.657,2.343s4.095-0.781,5.657-2.343c3.124-3.125,3.124-8.189,0-11.314L267.314,256z"
                stroke="#947c00" stroke-width="25" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

                <path d="M256,59c26.602,0,52.399,5.207,76.677,15.475c23.456,9.921,44.526,24.128,62.623,42.225    
                c18.098,18.098,32.304,39.167,42.226,62.624C447.794,203.601,453,229.398,453,256c0,26.602-5.206,52.399-15.475,76.677    
                c-9.922,23.456-24.128,44.526-42.226,62.623c-18.097,18.098-39.167,32.304-62.623,42.226C308.399,447.794,282.602,453,256,453    
                c-26.602,0-52.399-5.206-76.676-15.475c-23.457-9.922-44.526-24.128-62.624-42.226c-18.097-18.097-32.304-39.167-42.225-62.623    
                C64.207,308.399,59,282.602,59,256c0-26.602,5.207-52.399,15.475-76.676c9.921-23.457,24.128-44.526,42.225-62.624    
                c18.098-18.097,39.167-32.304,62.624-42.225C203.601,64.207,229.398,59,256,59 M256,43C138.363,43,43,138.363,43,256    
                s95.363,213,213,213s213-95.363,213-213S373.637,43,256,43L256,43z"
                stroke="#947c00" stroke-width="25" fill="none"/>
            </g>
        </g>
    </svg>
    </a>
    </div>`
  div.innerHTML = err_msg_temp
  setTimeout(() => {
    div.style.opacity=0
    setTimeout(() => {
      div.remove()
    }, 1200);
  }, 3000);
  con.append(div)

}

function prize_data(contest_id, data, no_of_players, spots_available, entry_fee) {
  let prize_details = {};
  let total_winners = 0; 
  for (let i = 1; i <= 10; i++) {
    let key = `stage${i}`;
    if (data[key]) {
      let [rank, prize] = data[key].split(":"); 
      let numWinners = 1; 

      if (rank.includes("-")) {
        let [start, end] = rank.split("-").map(Number);
        if (start === 1) {
          prize_details["max_prize"] = parseInt(prize)
        }
        numWinners = end - start + 1;
      }
      if (parseInt(rank) === 1) {
        prize_details["max_prize"] = parseInt(prize)
      }
      prize_details[rank] = parseInt(prize); 
      total_winners += numWinners; 

    }
  }

  const winners_percentage = ((total_winners / no_of_players) * 100).toFixed(0); 
  prize_details["contest_id"] = contest_id
  prize_details["winners_percentage"] = `${winners_percentage}%`;
  prize_details["total_spots"] = no_of_players
  prize_details["spots_available"] = spots_available
  prize_details["entry_fee"] = entry_fee
  return prize_details;
}
function timeLeft(dateWise, matchTime) {
  try {
    // console.log(dateWise,matchTime);
    const dateStr = matchTime.split(",")[0];
    const matchDatetimeStr = `${dateWise} ${dateStr}`;
    // Create Date objects (Note: JavaScript's Date handling can be tricky with formats)
    const matchDate = new Date(matchDatetimeStr);
    const now = new Date();
    const timeDifference = matchDate.getTime() - now.getTime(); // Difference in milliseconds

    if (timeDifference < 0) {
      return "Live";
    }
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    if (days > 0) {
      return `${days}d ${hours}h`
    }
    else if (days <= 0 && hours > 0 && minutes > 0) {
      return ` ${hours}h ${minutes}m`
    }
    else if (minutes > 0 && seconds > 0) {
      return `${minutes}m ${seconds}s`
    }
    else if (seconds > 0) {
      return `${seconds}s`
    }
    else if (minutes > 0 && seconds === 0) {
      return `${minutes}m ${seconds}s`
    }
    else if(minutes===0 && seconds ===0 && hours===0){
      return "live";
    }
    //return`${days}d ${hours}h ${minutes}m ${seconds}s`
  } catch (err) {
    throw new Error(err);

  }
}

function display_loading(t) {
  if (t) {
    document.getElementById("loading_container").style.display = "block"
  }
  else {
    document.getElementById("loading_container").style.display = "none"
  }
}

function formatNumber(num) {
  if (num >= 10000000) { // 1 Crore and above
    return (num / 10000000).toFixed(2).replace(/\.00$/, '') + " Crores";
  } else if (num >= 100000) { // 1 Lakh and above
    return (num / 100000).toFixed(2).replace(/\.00$/, '') + " Lakhs";
  } else {
    return num.toLocaleString("en-IN"); // Indian-style comma formatting
  }
}

module.exports = { server, display_error, prize_data, timeLeft, display_loading, formatNumber }