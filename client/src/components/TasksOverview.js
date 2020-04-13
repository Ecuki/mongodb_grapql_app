import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";
import { useSelector } from "react-redux";
import { Table, Label, Icon, Button, Header } from "semantic-ui-react";

import TaskForm from "../components/TaskForm";

import { FETCH_TASK_QUERY } from "../utils/graphql";

const initModalState = { isEdited: false, isNew: false };

function TasksOverview({ taskId }) {
  const taskColorByImportance = useSelector(
    state => state.taskColorByImportance
  );
  const [openModal, setOpenModal] = useState(initModalState);

  const { loading, error, data } = useQuery(FETCH_TASK_QUERY, {
    variables: { taskId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    id,
    username,
    body,
    createdAt,
    tag,
    importance,
    topic
  } = data.getTask;

  const { isEdited, isNew } = openModal;
  return (
    <>
      <Header>
        Tasks Overview
        <Button.Group floated="right">
          <Button
            color="green"
            onClick={() => setOpenModal({ ...openModal, isNew: true })}
          >
            <Icon name="add" />
            Add new task
          </Button>
          <Button
            color="blue"
            onClick={() => setOpenModal({ ...openModal, isEdited: true })}
          >
            <Icon name="edit" />
            Edit
          </Button>
        </Button.Group>
      </Header>
      <Table celled striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Icon name="sort amount up" /> Importance
            </Table.Cell>
            <Table.Cell>
              <Label color={taskColorByImportance[importance]} tag size="mini">
                {importance}
              </Label>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="tag" /> Tag
            </Table.Cell>
            <Table.Cell>{tag}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="heading" /> Task topic
            </Table.Cell>
            <Table.Cell>{topic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="file text" /> Task description
            </Table.Cell>
            <Table.Cell>{body}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="key" /> ID:
            </Table.Cell>
            <Table.Cell>{id}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="user" /> Author:
            </Table.Cell>
            <Table.Cell>{username}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="time" /> Created
            </Table.Cell>
            <Table.Cell>{moment(createdAt).calendar()}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <TaskForm
        open={isEdited || isNew}
        setOpenModal={setOpenModal}
        isEdited={isEdited}
        editedTask={data.getTask}
      />
    </>
  );
}

export default TasksOverview;
