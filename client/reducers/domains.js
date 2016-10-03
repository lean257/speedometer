import { ADD_DOMAIN, RECEIVE_DOMAIN, RECEIVE_DOMAINS, RECEIVE_DOMAIN_METRICS } from '../actions';

function domains(state = [], action) {
  switch (action.type) {
    case ADD_DOMAIN: {
      const { id, uri, httpMethod, metrics } = action;
      return [{ id, uri, httpMethod, metrics }, ...state];
    }
    case RECEIVE_DOMAINS: {
      return action.domains;
    }
    case RECEIVE_DOMAIN: {
      const index = state.findIndex(domain => domain.id === action.alternateId);

      return [
        ...state.slice(0, index), // left parth
        { ...state[index], id: action.id },
        ...state.slice(index + 1), // right part
      ];
    }
    case RECEIVE_DOMAIN_METRICS: {
      const { uri, metrics } = action;
      const index = state.findIndex(domain => domain.uri === uri);
      return [
        ...state.slice(0, index), // left parth
        { ...state[index], metrics: metrics[uri] },
        ...state.slice(index + 1), // right part
      ];
    }
    default:
      return state;
  }
}

export default domains;
