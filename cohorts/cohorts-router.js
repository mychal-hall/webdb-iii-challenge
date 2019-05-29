const express = require("express");

const Cohorts = require("./cohorts-model.js");
// import student router on line 4

const router = express.Router();

// Lists all the cohorts in the database == GET /api/cohorts
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
router.get("/:id", validateCohortId, async (req, res) => {
  res.status(200).json(req.cohort);
});

//  Returns all the students assigned to a specific cohort -- GET /api/cohorts/:id/students
router.get("/:id/students", validateCohortId, async (req, res) => {
  try {
    const students = await Cohorts.getCohortStudents(req.params.id);
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error finding students for this cohort" });
  }
});

// Adds a new cohort to the database and returns the new cohort -- POST /api/cohorts
router.post("/", validateCohort, async (req, res) => {
  try {
    const cohort = await Cohorts.insert(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating the new Cohort!" });
  }
});

// Updates a cohort. -- PUT /api/cohorts/:id
router.put("/:id", validateCohortId, async (req, res) => {
  try {
    const cohort = await Cohorts.update(req.params.id, req.body);
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "No cohort with that ID exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the cohort." });
  }
});

// Deletes a Cohort. Returns number of deleted cohorts -- DELETE /api/cohorts/:id
router.delete("/:id", validateCohortId, async (req, res) => {
  try {
    const count = await Cohorts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The Cohort is removed." });
    } else {
      res.status(404).json({ message: "No cohort exists with that ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Critical Error - Unable to comply." });
  }
});

//  Middleware
async function validateCohortId(req, res, next) {
  try {
    const { id } = req.params;
    const cohort = await Cohorts.getById(id);
    if (cohort) {
      req.cohort = cohort;
      next();
    } else {
      res.status(404).json({ message: "No Cohort exists with that ID" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Critical Error - Unable to comply." });
  }
}

function validateCohort(req, res, next) {
  if (req.body && Object.keys(req.body).length) {
    if (req.body.name !== "") {
      next();
    } else {
      res.status(400).json({ message: "Please name the Cohort" });
    }
  } else {
    res.status(500).json({ messages: "Critical Error - Unable to comply." });
  }
}

module.exports = router;
