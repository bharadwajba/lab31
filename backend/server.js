const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_COMPASS_URI = process.env.MONGO_COMPASS_URI || "mongodb://localhost:27017";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "myAppDB";
const REQUESTED_MONGO_URI = process.env.MONGO_URI || `${MONGO_COMPASS_URI}/${MONGO_DB_NAME}`;
const MONGO_URI = process.env.RUNNING_IN_DOCKER === "true" && REQUESTED_MONGO_URI.startsWith(MONGO_COMPASS_URI)
  ? process.env.MONGO_DOCKER_URI || `mongodb://mongo:27017/${MONGO_DB_NAME}`
  : REQUESTED_MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log(`MongoDB connected: ${MONGO_URI}`))
  .catch(err => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({
    message: "Lab27 backend is running",
    api: "/api",
    compassUri: MONGO_COMPASS_URI,
    database: MONGO_DB_NAME
  });
});

app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
