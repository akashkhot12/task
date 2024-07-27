import React, { useState, useEffect } from "react";
import axios from "axios";

const CovidDropdown = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/covid_data"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const states = Object.keys(data).filter((key) => data[key].statecode);

  return (
    <div>
      <h1>Select State</h1>
      <div>
        <label>
          State:
          <select value={selectedState} onChange={handleStateChange}>
            <option value="" disabled>
              Select a state
            </option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedState && (
        <div>
          <h2>Selected State Data</h2>
          <pre>{JSON.stringify(data[selectedState], null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CovidDropdown;
