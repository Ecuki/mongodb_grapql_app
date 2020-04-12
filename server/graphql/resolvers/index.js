const userResolvers = require("./users");
const taskResolvers = require("./tasks");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...taskResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...taskResolvers.Mutation
  }
};
