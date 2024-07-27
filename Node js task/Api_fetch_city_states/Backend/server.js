const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = 5000;
const URL = "https://data.covid19india.org/v4/min/data.min.json";

app.use(cors());
app.use(express.json());

app.get("/api/covid_data", async (req, res) => {
  try {
    const response = await axios.get(URL);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
