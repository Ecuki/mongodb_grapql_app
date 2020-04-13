import React from "react";
import { useDispatch } from "react-redux";
import { deleteModalOpenAction } from "../redux";

import { Modal, Button } from "semantic-ui-react";

function ModalProvider({ children, header, isOpen, close, submit }) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(deleteModalOpenAction(false));

  return (
    <Modal open={isOpen}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={closeModal}>
          Nope
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Submit"
          onClick={closeModal}
        />
      </Modal.Actions>
    </Modal>
  );
}
export default ModalProvider;
