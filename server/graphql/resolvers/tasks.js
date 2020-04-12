const Task = require("../../models/Task");
const checkAuth = require("../../util/check-auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getTasks() {
      try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        return tasks;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getTask(_, { taskId }) {
      try {
        const task = await Task.findById(taskId);
        if (task) return task;
        else throw new Error("Task not found");
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createTask(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Task body must not be empty");
      }
      const newTask = new Task({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });
      const task = await newTask.save();
      return task;
    },

    async deleteTask(_, { taskId }, context) {
      const user = checkAuth(context);
      try {
        const task = await Task.findById(taskId);
        if ((user.username = task.username)) {
          await task.delete();
          return "Task delete successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateTask(_, { taskId, body }, context) {
      const user = checkAuth(context);
      try {
        const task = await Task.findById(taskId);
        if ((user.username = task.username)) {
          task.body = body;
          await task.save();
          return "Task updated successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
