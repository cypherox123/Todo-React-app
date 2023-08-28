// taskReducer.js
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK = 'EDIT_TASK';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
  });

  export const editTask = (task) => ({ // Create the editTask action
    type: EDIT_TASK,
    payload: task,
  });

const initialState = {
  tasks: {},
  taskIdCounter: 1, 
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const newTask = {
        ...action.payload,
        id: state.taskIdCounter, 
      };
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [state.taskIdCounter]: newTask,
        },
        taskIdCounter: state.taskIdCounter + 1, // Increment the counter
      };
      case DELETE_TASK:
        const updatedTasks = { ...state.tasks };
        delete updatedTasks[action.payload]; // Remove the task with the given ID
        return {
          ...state,
          tasks: updatedTasks,
        };
        case EDIT_TASK:
            return {
              ...state,
              tasks: {
                ...state.tasks,
                [action.payload.id]: action.payload, // Update the task with edited data
              },
            };
    default:
      return state;
  }
};

export default taskReducer;
