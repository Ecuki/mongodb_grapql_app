import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteModalOpenAction } from "../redux";

import { Button, Image, List, Label, Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import imgProfile from "../assets/no_image.png";

const Task = ({ task, setActiveItemId, onDelete }) => {
  const taskColorByImportance = useSelector(
    state => state.taskColorByImportance
  );
  const { user } = useContext(AuthContext);
  const { id, username, tag, importance, topic } = task;

  function handleWatchClick() {
    setActiveItemId(id);
  }

  return (
    <List.Item>
      <Grid divided centered>
        <Grid.Row>
          <Grid.Column width={2}>
            <List.Content>
              <Image avatar src={imgProfile} />
            </List.Content>
          </Grid.Column>
          <Grid.Column width={2}>
            <List.Content>{username}</List.Content>
          </Grid.Column>

          <Grid.Column width={7}>
            {topic}
            <Label color={taskColorByImportance[importance]} tag size="mini">
              {importance}
            </Label>
          </Grid.Column>
          <Grid.Column width={2}>{tag}</Grid.Column>
          <Grid.Column width={2}>
            <Button
              circular
              color="white"
              icon="eye"
              size="mini"
              onClick={handleWatchClick}
            />
            {username === user.username && (
              <Button
                id={id}
                circular
                color="red"
                icon="delete"
                size="mini"
                onClick={() => onDelete(task)}
              />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </List.Item>
  );
};

export default Task;
