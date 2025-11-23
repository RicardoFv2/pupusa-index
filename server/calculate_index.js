const fs = require("fs").promises;
const path = require("path");

const SUBMISSIONS_FILE = path.join(__dirname, "submissions.json");
const PRICES_FILE = path.join(__dirname, "prices.json");

async function calculateIndex() {
  try {
    console.log("Starting Pupusa Index Calculation...");

    // Read submissions
    let submissions = [];
    try {
      const data = await fs.readFile(SUBMISSIONS_FILE, "utf8");
      submissions = JSON.parse(data);
    } catch (error) {
      console.log("No submissions file found or empty.");
      return;
    }

    if (submissions.length === 0) {
      console.log("No submissions to process.");
      return;
    }

    // Filter outliers (simple logic: price must be between $0.25 and $5.00)
    const validSubmissions = submissions.filter(
      (s) => s.price >= 0.25 && s.price <= 5.0
    );

    if (validSubmissions.length === 0) {
      console.log("No valid submissions after filtering.");
      return;
    }

    // Calculate Average
    const total = validSubmissions.reduce((sum, s) => sum + s.price, 0);
    const average = total / validSubmissions.length;

    console.log(`Processed ${validSubmissions.length} valid submissions.`);
    console.log(`New Average Price: $${average.toFixed(2)}`);

    // Update prices.json
    let prices = {};
    try {
      const pricesData = await fs.readFile(PRICES_FILE, "utf8");
      prices = JSON.parse(pricesData);
    } catch (error) {
      console.log("Prices file not found, creating new one.");
    }

    // Update the main index price
    prices["pupusa revuelta"] = parseFloat(average.toFixed(2));
    // Also update legacy key if present
    if (prices["revueltas"]) {
      prices["revueltas"] = parseFloat(average.toFixed(2));
    }

    await fs.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2), "utf8");
    console.log("Prices updated successfully in prices.json");
  } catch (error) {
    console.error("Error calculating index:", error);
  }
}

calculateIndex();
