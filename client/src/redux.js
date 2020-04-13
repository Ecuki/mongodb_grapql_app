import { createStore } from "redux";

const initialState = {
  tasks: [
    {
      id: "",
      username: "",
      body: "",
      createdAt: "",
      tag: "",
      importance: "",
      topic: ""
    }
  ],

  taskToDelete: null,
  deleteModalOpen: false,
  header: "",
  taskColorByImportance: {
    low: "black",
    normal: "yellow",
    high: "red"
  }
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export function reducer(state, { type, payload }) {
  switch (type) {
    case "DELETE_MODAL_OPEN":
      return {
        ...state,
        deleteModalOpen: true,
        taskToDelete: payload.task,
        modalHeader: payload.header
      };
    case "DELETE_MODAL_CLOSE":
      return {
        ...state,
        deleteModalOpen: false
      };
    case "FETCH_TASKS":
      console.log(payload);

      return {
        ...state,
        tasks: payload
      };
    default:
      return state;
  }
}

export const deleteModalOpenAction = payload => ({
  type: "DELETE_MODAL_OPEN",
  payload
});

export const deleteModalCloseAction = payload => ({
  type: "DELETE_MODAL_CLOSE",
  payload
});

export const fetchTasks = payload => ({
  type: "FETCH_TASKS",
  payload
});
