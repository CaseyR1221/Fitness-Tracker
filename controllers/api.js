const router = require("express").Router();
const Workout = require("../models/workout.js");

// route used to GET all workouts that have been done
router.get("/workouts", (req, res) => {
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

// route to GET all workouts from the past 7 days 
router.get("/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route to POST a new workout you have done 
router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// route to UPDATE a past one of the workouts you have done 
router.put("/workouts/:id", ({ body, params }, res) => {
  const workoutRoutine = body;
  Workout.findByIdAndUpdate(
    { 
      _id: `${params.id}` 
    },
    { 
      $push: { exercises: workoutRoutine } 
    })
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;