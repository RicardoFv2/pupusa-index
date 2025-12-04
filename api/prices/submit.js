const fs = require("fs");
const path = require("path");

const TMP_FILE = "/tmp/submissions.json";

// Helper to save submission
function saveSubmission(submission) {
  let submissions = [];
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, "utf8");
      submissions = JSON.parse(data);
    }
  } catch (error) {
    // Ignore error
  }
  submissions.push(submission);
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(submissions, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to /tmp:", error);
  }
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
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

      saveSubmission(submission);
      return res.status(200).json({
        message: "Price submitted successfully (Ephemeral /tmp storage)",
        submission,
      });
    } catch (error) {
      console.error("Error submitting price:", error);
      return res.status(500).json({ message: "Failed to submit price" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};
