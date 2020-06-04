import React, { useState, useEffect } from "react";
import "./Clock.css";
import axios from "axios";
const Clock = () => {
  const [Confirmed, setConfirmed] = useState(null);
  const [Active, setActive] = useState(null);
  const [Deaths, setDeaths] = useState(null);
  const [UpDate, setUpDate] = useState(null);
  const [Recovered, setRecovered] = useState(null);

  const fetchDataApi = async () => {
    const apiFetchComfirmed = await axios
      .get("https://covid2019-api.herokuapp.com/v2/total")
      .then((resp) => {
        const confirmedCases = resp.data.data.confirmed;
        setConfirmed(confirmedCases);

        const lastUpdateDate = resp.data.dt;
        setUpDate(lastUpdateDate);

        const activeCases = resp.data.data.active;
        setActive(activeCases);

        const recoveredCases = resp.data.data.recovered;
        setRecovered(recoveredCases);

        const DeathCases = resp.data.data.deaths;
        setDeaths(DeathCases);
      })
      .catch((err) => console.log("err"));
  };

  useEffect(() => {
    fetchDataApi(Confirmed, Active, Recovered, Deaths, UpDate);
  }, []);

  return (
    <div className="clockmain-Container">
      <div className="clock-container">
        <h1 className="clock-h1">
          {Confirmed ? `Comfirmed${Confirmed}` : "Please wait...."}
        </h1>
        <h3 className="clock-h1">
          {Active ? `Infected ${Active}` : "Please wait...."}
        </h3>
        <h3 className="clock-h1">
          {Recovered ? `Recovered ${Recovered}` : "Please wait...."}
        </h3>
        <h3 className="clock-h1">
          {Deaths ? `Deaths ${Deaths}` : "Please wait...."}
        </h3>
        {/* <h2 className='clock-h1'>
					{ `Leading Country `}
				</h2> */}

        <p className="clock-h1">
          <h3>Last Update date</h3> {UpDate ? UpDate : "Please wait...."}
        </p>
      </div>
    </div>
  );
};

export default Clock;
