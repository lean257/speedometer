import { ADD_DOMAIN, RECEIVE_DOMAIN } from '../actions';

function domains(state = [], action) {
  switch (action.type) {
    case ADD_DOMAIN: {
      const { id, uri, httpMethod } = action;
      return [{ id, uri, httpMethod }, ...state];
    }
    case RECEIVE_DOMAIN: {
      const index = state.findIndex(domain => domain.id === action.alternateId);

      return [
        ...state.slice(0, index), // left parth
        { ...state[index], id: action.id },
        ...state.slice(index + 1), // right part
      ];
    }
    default:
      return state;
  }
}

export default domains;
