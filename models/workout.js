const mongoose = require("mongoose");

const workoutSchema = new workoutSchema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
          type: {
            type: String,
            required: true,
            trim: true
          },
          name: {
            type: String,
            required: true,
            trim: true
          },
          duration: {
            type: Number,
            required: true,
            trim: true
          },
          weight: {
            type: Number
          },
          reps: Number,
          sets: Number,
          distance: Number,
        },
      ]
})

const Workout = mongoose.model("Workout", workout);

module.exports = Workout;