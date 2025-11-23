const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "prices.json");
const ADMIN_PASSWORD = "pupusa123"; // Simple hardcoded password

app.use(cors());
app.use(express.json()); // Enable JSON body parsing

// Helper to get prices
async function getPupusaPrices() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading price file:", error);
    return {};
  }
}

// Helper to save prices
async function savePupusaPrices(prices) {
  await fs.writeFile(DATA_FILE, JSON.stringify(prices, null, 2), "utf8");
}

// Endpoint to get all pupusa prices
app.get("/api/pupusa-prices", async (req, res) => {
  const prices = await getPupusaPrices();
  res.json(prices);
});

// Endpoint to get a specific pupusa price
app.get("/api/pupusa-price/:type", async (req, res) => {
  const type = req.params.type.toLowerCase();
  const prices = await getPupusaPrices();

  if (prices[type] !== undefined) {
    res.json({ type, price: prices[type] });
  } else {
    res.status(404).json({ message: "Pupusa type not found" });
  }
});

// Endpoint to update prices
app.post("/api/pupusa-prices", async (req, res) => {
  try {
    const password = req.headers["x-admin-password"];

    if (password !== ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Incorrect password" });
    }

    const newPrices = req.body;

    // Basic validation: ensure it's an object and values are numbers
    if (typeof newPrices !== "object" || newPrices === null) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const currentPrices = await getPupusaPrices();
    const updatedPrices = { ...currentPrices, ...newPrices };

    // Ensure all values are numbers
    for (const key in updatedPrices) {
      updatedPrices[key] = parseFloat(updatedPrices[key]);
    }

    await savePupusaPrices(updatedPrices);
    res.json({ message: "Prices updated successfully", prices: updatedPrices });
  } catch (error) {
    console.error("Error updating prices:", error);
    res.status(500).json({ message: "Failed to update prices" });
  }
});

const SUBMISSIONS_FILE = path.join(__dirname, "submissions.json");

// Helper to save submission
async function saveSubmission(submission) {
  let submissions = [];
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, "utf8");
    submissions = JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, start with empty array
  }
  submissions.push(submission);
  await fs.writeFile(
    SUBMISSIONS_FILE,
    JSON.stringify(submissions, null, 2),
    "utf8"
  );
}

// Endpoint to submit a price
app.post("/api/prices/submit", async (req, res) => {
  try {
    const { location, price, establishment } = req.body;

    if (!location || !price) {
      return res
        .status(400)
        .json({ message: "Location and price are required" });
    }

    const submission = {
      location,
      price: parseFloat(price),
      establishment: establishment || "Anonymous",
      date: new Date().toISOString(),
    };

    await saveSubmission(submission);
    res.json({ message: "Price submitted successfully", submission });
  } catch (error) {
    console.error("Error submitting price:", error);
    res.status(500).json({ message: "Failed to submit price" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
