const express = require("express");
const xml2js = require("xml2js");
const Data = require("../models/data");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get the data from the aurora-watch API
    const response = await fetch(
      "https://aurorawatch-api.lancs.ac.uk/0.2/status/current-status.xml"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }

    // Parse the XML response

    const xmlText = await response.text(); // Read the response as text

    // Parse the XML response
    xml2js.parseString(xmlText, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }

      // Access status_id and datetime properties
      const statusId = result.current_status.site_status[0].$.status_id;
      const datetime = result.current_status.updated[0].datetime[0];

      // To send the data to the client, using json() method

      // Store it in the database

      const data = new Data({
        statusId,
        datetime,
      });

      data
        .save()
        .then(() => {
          console.log("API Data has been saved to the database.");
        })
        .catch((err) => console.log(err));

      // Send the data to the client.
      res.json({
        statusId,
        datetime,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
