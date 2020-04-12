import React from "react";

import { Button, Image, List, Label, Grid } from "semantic-ui-react";

import imgProfile from "../assets/no_image.png";
import moment from "moment";

const taskColorByImportance = {
  low: "black",
  normal: "yellow",
  high: "red"
};

const TasksList = ({ tasks }) => {
  return (
    <List divided verticalAlign="middle">
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} />

          <Grid.Column width={2}>
            <List.Content as="h5">Username</List.Content>
          </Grid.Column>

          <Grid.Column width={8}>Topic</Grid.Column>
          <Grid.Column width={1} />
        </Grid.Row>
      </Grid>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </List>
  );
};

const Task = ({ task }) => {
  console.log(task);
  const { username, body, createdAt, tag, importance, topic } = task;
  return (
    <List.Item>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image avatar src={imgProfile} />
          </Grid.Column>
          <Grid.Column width={2}>
            <List.Content>{username}</List.Content>
          </Grid.Column>

          <Grid.Column width={8}>
            {topic}
            <Label
              as="a"
              color={taskColorByImportance[importance]}
              tag
              size="mini"
            >
              {importance}
            </Label>
          </Grid.Column>
          <Grid.Column width={1}>
            <Button>+</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </List.Item>
  );
};

export default TasksList;
