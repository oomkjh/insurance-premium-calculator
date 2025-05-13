const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", async (_req, res) => {
  try {
    const { data } = await axios.get("https://fgt9jf-8080.csb.app/getProducts");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

app.post("/api/premium-calculation", async (req, res) => {
  try {
    const { data } = await axios.post(
      "https://fgt9jf-8080.csb.app/premium-calculation",
      req.body,
      {
        headers: {
          "x-api-key": "1399da23-715d-42af-beb3-2008fd652622",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Premium calculation failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BFF Server running on port ${PORT}`));
