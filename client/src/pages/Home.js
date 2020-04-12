import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Container, Grid } from "semantic-ui-react";

import UsersList from "../components/UsersList";
import UserProfile from "../components/UserProfile";
import { AuthContext } from "../context/auth";
import { FETCH_USERS_QUERY } from "../utils/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_USERS_QUERY);

  return (
    <Container>
      <Grid centered style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column width={4}>
          {!loading && data && <UsersList users={data.getUsers} />}
        </Grid.Column>
        <Grid.Column width={8}>
          {!loading && data && <UserProfile user={user} />}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
