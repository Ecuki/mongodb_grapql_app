const { model, Schema } = require("mongoose");

const taskSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  importance: String,
  tag: String,
  topic: String,

  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Task", taskSchema);
