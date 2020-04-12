import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Form } from "semantic-ui-react";

import { CREATE_TASK_MUTATION, FETCH_TASKS_QUERY } from "../utils/graphql";

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

function TaskForm() {
  const [task, setTask] = useState(initialTask);
  const [errors, setErrors] = useState(initialErrors);

  const { body, topic, tag, importance } = task;

  function handleChange(e, result) {
    const { name, value } = result;
    setTask({ ...task, [name]: value });
    setErrors({ ...errors, [name]: null });
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

  function onSubmit(e) {
    e.preventDefault();
    createTask();
  }

  return (
    <Form onSubmit={onSubmit} loading={loading ? true : false}>
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

      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

export default TaskForm;
