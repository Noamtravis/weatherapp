import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3001;

const apiKey = "7edfb82d113d4295952103454243103";
const apiUrl = "http://api.weatherapi.com/v1/forecast.json";

app.use(cors());
app.use(express.json());

app.get("/weather", async (req, res) => {
  try {
    const { city } = req.query;
    const url = `${apiUrl}?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
