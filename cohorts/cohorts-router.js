const express = require("express");

const Cohorts = require("./cohorts-model.js");
// import student router on line 4

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohorts.get();
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting cohorts." });
  }
});

module.exports = router;
