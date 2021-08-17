const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/workouts", (req, res) => {
    // send last workout data
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/workouts/:id", ({body, params}, res) => {

});

module.exports = router;