const gql = require("graphql-tag");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
    termAgree: Boolean!
  }
  type Task {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getTasks: [Task]
    getTask(taskId: ID!): Task
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createTask(body: String!): Task!
    deleteTask(taskId: ID!): String!
    updateTask(postId: ID!): String!
  }
`;
