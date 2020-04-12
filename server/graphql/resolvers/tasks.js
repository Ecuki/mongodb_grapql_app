const Task = require("../../models/Task");
const checkAuth = require("../../utils/check-auth");
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
    async createTask(_, { body, importance, tag, topic }, context) {
      const user = checkAuth(context);

      const { errors, valid } = validateLoginInput(body, tag, topic);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const newTask = new Task({
        body,
        tag,
        topic,
        importance,
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
          return taskId;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async updateTask(_, { taskId, body, tag, topic, importance }, context) {
      const user = checkAuth(context);
      const { errors, valid } = validateLoginInput(
        body,
        tag,
        topic,
        importance
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      try {
        const task = await Task.findById(taskId);
        if ((user.username = task.username)) {
          task = { ...task, body, tag, topic, importance };
          await task.save();
          return task;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
