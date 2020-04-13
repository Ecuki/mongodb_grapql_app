import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Form } from "semantic-ui-react";

import {
  CREATE_TASK_MUTATION,
  FETCH_TASKS_QUERY,
  UPDATE_TASK_MUTATION
} from "../utils/graphql";
import ModalProvider from "./ModalProvaider";

const initialTask = {
  topic: "",
  body: "",
  tag: "",
  importance: "normal"
};

const importanceOptions = [
  { key: "l", text: "Low", value: "low" },
  { key: "n", text: "Normal", value: "normal" },
  { key: "h", text: "High", value: "high" }
];

const initialErrors = {
  topic: null,
  body: null,
  tag: null,
  importance: null
};

function TaskForm({ editedTask, open, setOpenModal, isEdited }) {
  const actualTaskState = isEdited ? editedTask : initialTask;

  const [task, setTask] = useState(actualTaskState);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    setTask(actualTaskState);
  }, [actualTaskState]);

  const { id, body, topic, tag, importance } = task;

  function handleChange(e, result) {
    const { name, value } = result;
    setTask({ ...task, [name]: value });
    setErrors({ ...errors, [name]: null });
    console.log("object");
  }

  const [createTask, { loading }] = useMutation(CREATE_TASK_MUTATION, {
    variables: { ...task },
    update(
      cache,
      {
        data: { createTask }
      }
    ) {
      const { getTasks } = cache.readQuery({ query: FETCH_TASKS_QUERY });
      cache.writeQuery({
        query: FETCH_TASKS_QUERY,
        data: { getTasks: [createTask, ...getTasks] }
      });
      setTask(initialTask);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    }
  });

  const [updateTask, { loading: loadingUpdate }] = useMutation(
    UPDATE_TASK_MUTATION,
    {
      variables: { taskId: id, body, topic, tag, importance },
      update(
        cache,
        {
          data: { updateTask }
        }
      ) {
        const { getTasks } = cache.readQuery({ query: FETCH_TASKS_QUERY });
        cache.writeQuery({
          query: FETCH_TASKS_QUERY,
          data: {
            getTasks: [...getTasks.map(t => (t.id === id ? updateTask : t))]
          }
        });
        setTask(initialTask);
      },
      onError(err) {
        console.log(err.graphQLErrors[0]);
        setErrors(err.graphQLErrors[0].extensions.errors);
      }
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (isEdited) {
      updateTask();
    } else {
      createTask();
    }

    const noErrors = Object.keys(errors).findIndex(
      error => errors[error] === null
    );
    if (noErrors) {
      handleModalClose();
    }
  }

  function handleModalClose() {
    setErrors(initialErrors);
    setOpenModal({ isEdited: false, isNew: false });
    setTask(initialTask);
  }
  const modalHeader = isEdited ? "Edit a Task" : "Add new Task";

  return (
    <ModalProvider
      header={modalHeader}
      isOpen={open}
      close={handleModalClose}
      submit={handleSubmit}
    >
      <Form loading={loading || loadingUpdate ? true : false}>
        <Form.Input
          fluid
          label="Task topic"
          name="topic"
          onChange={handleChange}
          placeholder="Short task description"
          value={topic}
          error={errors.topic}
        />
        <Form.Input
          fluid
          label="Tag"
          name="tag"
          onChange={handleChange}
          placeholder="Tag"
          value={tag}
          error={errors.tag}
        />
        <Form.Dropdown
          fluid
          name="importance"
          label="Importance"
          selection
          onChange={handleChange}
          options={importanceOptions}
          placeholder="Importance"
          value={importance}
          error={errors.importance}
        />

        <Form.TextArea
          label="Task description"
          name="body"
          onChange={handleChange}
          placeholder="Tell us more about this task..."
          value={body}
          error={errors.body}
        />
      </Form>
    </ModalProvider>
  );
}

export default TaskForm;
