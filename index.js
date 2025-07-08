import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const STATS_ENDPOINT = "https://script.google.com/macros/s/AKfycbx55rbX7Ham-zW41BRbTLNXf_5RQmg5n03NSUtsrmpqrovebylKIcAJGC4BKDTo03-A/exec";

app.post("/proxy-google-sheet", async (req, res) => {
  try {
    const response = await fetch(STATS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("🟢 Proxy Google Sheets OK");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Proxy lancé sur le port " + PORT);
});
