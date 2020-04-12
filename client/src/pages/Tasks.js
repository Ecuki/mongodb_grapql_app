import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const initialTask = {
  topic: "",
  body: "",
  tag: "",
  importance: "normal"
};

const importanceOptions = [
  { key: "l", text: "Low", value: "low" },
  { key: "n", text: "Normal", value: "normal" },
  { key: "h", text: "High", value: "high " }
];

const initialErrors = {
  topic: null,
  body: null,
  tag: null,
  importance: null
};

function Tasks() {
  const [task, setTask] = useState(initialTask);
  const [errors, setErrors] = useState(initialErrors);
  const { body, topic, tag, importance } = task;

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null, message: null });
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Task topic "
          placeholder="Short task description"
        />
        <Form.Input fluid label="Tag" placeholder="Last name" />
        <Form.Select
          fluid
          label="Importance"
          options={importanceOptions}
          placeholder="Importance"
        />
      </Form.Group>

      <Form.TextArea label="About" placeholder="Tell us more about you..." />

      <Form.Button>Submit</Form.Button>
    </Form>
  );
}

export default Tasks;
