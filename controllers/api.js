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

router.post("/workouts", ({ body }, res) => {
  // add new workout data
  // const workout = new db.Workout(body);
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/workouts/:id", ({body, params}, res) => {

});

module.exports = router;