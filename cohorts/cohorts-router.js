const express = require("express");

const Cohorts = require("./cohorts-model.js");
// import student router on line 4

const router = express.Router();

// Lists all the zoos in the database == GET /api/cohorts
router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohorts.get();
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting cohorts." });
  }
});

// Returns one cohort with a specific ID -- GET /api/cohorts/:id
router.get("/:id", validateCohortId)


//  Middleware 

async function validateCohortId(req, res, next) {
  try {
    const { id } = req.params;
    const zoo = await Cohorts.getById(id);
    if (cohort) {
      req.cohort = cohort;
      next();
    } else {
      res.status(404).json({ message: "No Cohort exists with that ID" })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Critical Error - Unable to comply." })
  }
}

function validateCohort(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    if (req.body.name !== "") {
      next();
    } else {
      res.status(400).json({ message: "Please name the Cohort" })
    }
  } else {
    res.status(500).json({ messages: "Critical Error - Unable to comply." })
  }
}


module.exports = router;
