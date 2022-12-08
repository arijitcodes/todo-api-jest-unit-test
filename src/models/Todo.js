const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 1,
      required: [true, "Title is a required field!"],
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Todo", todoSchema);
