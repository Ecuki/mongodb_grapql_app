const { model, Schema } = require("mongoose");

const taskSchema = new Schame({
  body: String,
  username: String,
  createdAt: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = model("Task", taskSchema);
