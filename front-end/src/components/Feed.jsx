import React, { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [statusTime, setStatusTime] = useState("");
  const [colorCode, setColorCode] = useState("#00000"); // Default color
  const [description, setDescription] = useState("Error"); // Default description
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the API URL from the environment variable, or default to 'http://localhost:3000'
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

    async function fetchData() {
      try {
        const response = await axios.get(API_URL); // Replace with your backend API route
        const datetime = new Date(response.data.datetime);
        const formattedTime = datetime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
        setStatusTime(formattedTime);

        const status = response.data.statusId;
        // const status = "red"; - TESTING PURPOSES

        // Defining what color the api gives and the description it belongs with.
        const colorArray = [
          {
            name: "green",
            code: "#33ff33",
            description:
              "Aurora is unlikely to be visible by eye or camera from anywhere in the UK."
          },
          {
            name: "yellow",
            code: "#ffff00",
            description:
              "Aurora may be visible by eye from Scotland and may be visible by camera from Scotland, northern England and Northern Ireland."
          },
          {
            name: "amber",
            code: "#ff9900",
            description:
              "Aurora is likely to be visible by eye from Scotland, northern England and Northern Ireland; possibly visible from elsewhere in the UK. Photographs of aurora are likely from anywhere in the UK."
          },
          {
            name: "red",
            code: "#ff0000",
            description:
              "It is likely that aurora will be visible by eye and camera from anywhere in the UK."
          }
        ];

        // Find the matching object in colorArray based on the status
        const matchingColor = colorArray.find((item) => item.name === status);

        // Check if a matching color was found and set the state accordingly
        if (matchingColor) {
          setColorCode(matchingColor.code);
          setDescription(matchingColor.description);
        } else {
          // Handle the case where no matching color was found
          setColorCode("#00000"); // Set a default color code
          setDescription("Error"); // Set a default description
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="content-container">
          <h2 className="heading-2 alert">ALERT</h2>
          <div
            className="color-container"
            style={{ backgroundColor: colorCode }} // Remove unnecessary curly braces
          ></div>
          <div className="meaning-container">
            <h2 className="heading-2"> What does it mean ? </h2>
            <div className="meaning-content-container">
              <p className="meaning-paragraph"> {description}</p>
            </div>
          </div>
          <p className="updated-time"> Last Updated: {statusTime} </p>
        </div>
      )}
    </>
  );
}

export default Feed;
