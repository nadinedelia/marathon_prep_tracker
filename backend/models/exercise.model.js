const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { 
        type: Number, 
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Duration should be an integer.'
        },
        min: [1, 'Duration should be positive.']
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

// Add validation or custom methods to the schema if needed

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;