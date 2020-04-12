import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $termAgree: Boolean!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        termAgree: $termAgree
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      email
      username
      createdAt
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      createdAt
    }
  }
`;

export const EMIT_ONLINE_EVENT = gql`
  mutation {
    update_users
  }
`;
