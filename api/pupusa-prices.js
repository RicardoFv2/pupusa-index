const fs = require("fs");
const path = require("path");

// In Vercel, we can't write to the source directory.
// We'll use /tmp for temporary persistence in the same execution context,
// but ideally this should be a database (Vercel KV, Postgres, etc.)
const TMP_FILE = "/tmp/prices.json";
const SOURCE_FILE = path.join(process.cwd(), "server", "prices.json");

const ADMIN_PASSWORD = "pupusa123";

// Helper to get prices
function getPupusaPrices() {
  try {
    // Try reading from /tmp first (if we wrote to it previously in this container)
    if (fs.existsSync(TMP_FILE)) {
      const data = fs.readFileSync(TMP_FILE, "utf8");
      return JSON.parse(data);
    }
    // Fallback to the source file included in the deployment
    if (fs.existsSync(SOURCE_FILE)) {
      const data = fs.readFileSync(SOURCE_FILE, "utf8");
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error("Error reading price file:", error);
    return {};
  }
}

// Helper to save prices
// Helper to save prices
async function savePupusaPrices(prices) {
  try {
    // 1. Always write to /tmp for immediate local consistency in this container
    fs.writeFileSync(TMP_FILE, JSON.stringify(prices, null, 2), "utf8");

    // 2. If GITHUB_TOKEN is present, commit to the repo for permanent storage
    if (process.env.GITHUB_TOKEN) {
      const owner = process.env.GITHUB_REPO_OWNER || "RicardoFv2";
      const repo = process.env.GITHUB_REPO_NAME || "pupusa-index";
      const path = "server/prices.json";
      const message = "Update pupusa prices via Admin Dashboard";
      const content = Buffer.from(JSON.stringify(prices, null, 2)).toString(
        "base64"
      );

      // Get current SHA first (required for update)
      const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const getRes = await fetch(getUrl, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (getRes.ok) {
        const getData = await getRes.json();
        const sha = getData.sha;

        // Update file
        const putRes = await fetch(getUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            content,
            sha,
          }),
        });

        if (!putRes.ok) {
          console.error("GitHub update failed:", await putRes.text());
        } else {
          console.log("Successfully updated prices on GitHub!");
        }
      } else {
        console.error(
          "Could not find file on GitHub to update:",
          await getRes.text()
        );
      }
    }
  } catch (error) {
    console.error("Error saving prices:", error);
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
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-admin-password"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    const prices = getPupusaPrices();
    return res.status(200).json(prices);
  }

  if (req.method === "POST") {
    try {
      const password = req.headers["x-admin-password"];

      if (password !== ADMIN_PASSWORD) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Incorrect password" });
      }

      const newPrices = req.body;

      if (typeof newPrices !== "object" || newPrices === null) {
        return res.status(400).json({ message: "Invalid data format" });
      }

      const currentPrices = getPupusaPrices();
      const updatedPrices = { ...currentPrices, ...newPrices };

      // Ensure all values are numbers
      for (const key in updatedPrices) {
        updatedPrices[key] = parseFloat(updatedPrices[key]);
      }

      await savePupusaPrices(updatedPrices);
      return res.status(200).json({
        message: "Prices updated successfully (Ephemeral /tmp storage)",
        prices: updatedPrices,
      });
    } catch (error) {
      console.error("Error updating prices:", error);
      return res.status(500).json({ message: "Failed to update prices" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};
