import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { List, Grid } from "semantic-ui-react";

import { deleteModalOpenAction, deleteModalCloseAction } from "../redux";
import Task from "../components/Task";
import TasksOverview from "../components/TasksOverview";
import ModalProvider from "./ModalProvaider";

const TasksList = () => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.deleteModalOpen);

  const tasks = useSelector(state => state.tasks);
  const modalHeader = useSelector(state => state.header);
  const taskToDelete = useSelector(state => state.taskToDelete);

  const header = "Are you sure to delete this item?";

  const openModal = task => dispatch(deleteModalOpenAction({ task, header }));

  const closeModal = () => dispatch(deleteModalCloseAction());

  const [activeItemId, setActiveItemId] = useState(tasks[0].id);

  function handleSubmit() {
    openModal();
  }

  return (
    <>
      <Grid>
        <Grid.Row color="grey">
          <Grid.Column width={3} />

          <Grid.Column width={2}>
            <List.Content as="h5">Username</List.Content>
          </Grid.Column>

          <Grid.Column as="h5" width={7}>
            Topic
          </Grid.Column>
          <Grid.Column as="h5" width={2}>
            Tag
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
      <List
        divided
        verticalAlign="middle"
        style={{
          maxHeight: "50vh",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: 10
        }}
      >
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            setActiveItemId={setActiveItemId}
            onDelete={openModal}
          />
        ))}
      </List>
      <TasksOverview taskId={activeItemId} />
      <ModalProvider
        header={modalHeader}
        isOpen={open}
        close={closeModal}
        submit={handleSubmit}
      >
        {open && <Task task={taskToDelete} />}
      </ModalProvider>
    </>
  );
};

export default TasksList;
