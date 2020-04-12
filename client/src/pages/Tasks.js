import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_TASKS_QUERY } from "../utils/graphql";

import { Grid } from "semantic-ui-react";

import TasksList from "../components/TasksList";
import TaskForm from "../components/TaskForm";

function Tasks() {
  const { loading, error, data } = useQuery(FETCH_TASKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid>
      <Grid.Column width={10}>
        {data && <TasksList tasks={data.getTasks} />}
      </Grid.Column>
      <Grid.Column width={6}>
        <TaskForm />
      </Grid.Column>
    </Grid>
  );
}

export default Tasks;
