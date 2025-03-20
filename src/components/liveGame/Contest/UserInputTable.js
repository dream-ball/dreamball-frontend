import { useState, useEffect } from "react";
import { display_error, server } from "../../../utils/utils";

export default function UserInputTable({ openOver, selectedOptions, setHasFetched }) {
  const [selectedFours, setSelectedFours] = useState(null);
  const [selectedSixes, setSelectedSixes] = useState(null);
  const [selectedRuns, setSelectedRuns] = useState(null);
  const [selectedWickets, setSelectedWickets] = useState(null)
  const [selectedDots, setSelectedDots] = useState(null)

  const [defaultFours, setDefaultFours] = useState(null);
  const [defaultSixes, setDefaultSixes] = useState(null);
  const [defaultRuns, setDefaultRuns] = useState(null);
  const [defaultWickets, setDefaultWickets] = useState(null)
  const [defaultDots, setDefaultDots] = useState(null)
  const [defaultValue, setDefaultValue] = useState(true)
  const [loading, setLoading] = useState(false);
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (selectedOptions.length > 0) {
      setSelectedFours(selectedOptions[0].four)
      setSelectedSixes(selectedOptions[0].six)
      setSelectedRuns(selectedOptions[0].run)
      setSelectedWickets(selectedOptions[0].wicket)
      setSelectedDots(selectedOptions[0].dot);
      setDefaultFours(selectedOptions[0].four)
      setDefaultSixes(selectedOptions[0].six)
      setDefaultRuns(selectedOptions[0].run)
      setDefaultWickets(selectedOptions[0].wicket)
      setDefaultDots(selectedOptions[0].dot);

    } else {
      setSelectedFours(null)
      setSelectedSixes(null)
      setSelectedRuns(null)
      setSelectedWickets(null)
      setSelectedDots(null);
      setSelectedDots(null);
      setDefaultFours(null)
      setDefaultSixes(null)
      setDefaultRuns(null)
      setDefaultWickets(null)
      setDefaultDots(null);
    }

  }, [selectedOptions, val]);

  useEffect(() => {
    if (selectedFours !== defaultFours ||
      selectedSixes !== defaultSixes ||
      selectedRuns !== defaultRuns ||
      selectedWickets !== defaultWickets ||
      selectedDots !== defaultDots) {
      setDefaultValue(false)
    } else {
      setDefaultValue(true)
    }
  }, [selectedFours, selectedSixes, selectedRuns, selectedWickets, selectedDots, defaultFours, defaultSixes, defaultRuns, defaultWickets, defaultDots])


  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        fours: selectedFours,
        sixes: selectedSixes,
        runs: selectedRuns,
        wickets: selectedWickets,
        dots: selectedDots,
        match_id: openOver[0]?.match_id,
        over_number: openOver[0]?.over_number,
        innings: openOver[0]?.innings,
      };

      server.pathname = `/api/submit/users/over_data/`;

      const response = await fetch(server, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("auth_token") || "",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg);
      }


      setLoading(false);
      setHasFetched(false);
      console.log("Success:", result);
    } catch (error) {
      setLoading(false);
      display_error(error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="user_input_table">
      <div className="user_input input_table_header">
        <div className="user_input_table_header">What's Expected in Over {openOver.length ? openOver[0].over_number : ""}?🔥</div>

        <div className="input_reset" onClick={() => setVal(val + 1)}>
          🔃
        </div>
      </div>
      <div className="user_input">
        <div className="anz_input input_4">
          <div className="tag tag_head">Fours</div>
          {['1 - 2', 'More than 2', 'No Four'].map((option) => (
            <div
              key={option}
              className={`tag tag_four ${selectedFours === option ? 'selected' : ''}`}
              onClick={() => setSelectedFours(option)}
            >
              {option}
            </div>
          ))}
          <div className="tag tag_four clear" onClick={() => setSelectedFours(null)}>Clear</div>
        </div>
      </div>

      <div className="user_input">
        <div className="anz_input input_6">
          <div className="tag tag_head">Sixes</div>
          {['1 - 2', 'More than 2', 'No Sixes'].map((option) => (
            <div
              key={option}
              className={`tag tag_six ${selectedSixes === option ? 'selected_six' : ''}`}
              onClick={() => setSelectedSixes(option)}>
              {option}
            </div>
          ))}
          <div className="tag tag_six clear" onClick={() => setSelectedSixes(null)}>Clear</div>
        </div>
      </div>
      <div className="user_input">
        <div className="anz_input input_run">
          <div className="tag tag_head">Runs</div>
          {['1 - 5', '6 - 10', 'More than 10', 'No Runs'].map((option) => (
            <div
              key={option}
              className={`tag tag_run ${selectedRuns === option ? 'selected_run' : ''}`}
              onClick={() => setSelectedRuns(option)}>
              {option}
            </div>
          ))}
          <div className="tag tag_clear clear" onClick={() => setSelectedRuns(null)}>Clear</div>
        </div>
      </div>
      <div className="user_input">
        <div className="anz_input input_run">
          <div className="tag tag_head">Wickets</div>
          {['1', '2', 'More than 2', 'No Wickets'].map((option) => (
            <div
              key={option}
              className={`tag tag_run ${selectedWickets === option ? 'selected_wicket' : ''}`}
              onClick={() => setSelectedWickets(option)}>
              {option}
            </div>
          ))}
          <div className="tag tag_clear clear" onClick={() => setSelectedWickets(null)}>Clear</div>
        </div>
      </div>
      <div className="user_input">
        <div className="anz_input input_run">
          <div className="tag tag_head">Dot Balls</div>
          {['1 Dot', '2 Dots', '3 Dots', 'More than 3'].map((option) => (
            <div
              key={option}
              className={`tag tag_run ${selectedDots === option ? 'selected_dot' : ''}`}
              onClick={() => setSelectedDots(option)}>
              {option}
            </div>
          ))}
          <div className="tag tag_clear clear" onClick={() => setSelectedDots(null)}>Clear</div>
        </div>
      </div>

      <div className="user_input">
        <div className="submit_overs_data uni_e">

          <button disabled={loading} className={defaultValue ? "joined" : ""} onClick={() => !defaultValue ? handleSubmit() : ""} >
            {loading ? <div className="spinnerrrs"></div> : <>{defaultValue ? selectedOptions.length > 0 ? "Submited Over" : "Submit Over" : selectedOptions.length > 0 ? "Update Over" : "Submit Over"} {openOver.length ? openOver[0].over_number : ""}</>}
          </button>
        </div>
      </div>
    </div>
  );
}
