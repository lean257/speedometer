import { ADD_DOMAIN, RECEIVE_DOMAIN, RECEIVE_DOMAINS, RECEIVE_DOMAIN_METRICS, DELETE_DOMAIN } from '../actions';

function domains(state = [], action) {
  switch (action.type) {
    case ADD_DOMAIN: {
      const { id, uri, httpMethod, metrics } = action;
      return [{ id, uri, httpMethod, metrics }, ...state];
    }
    case RECEIVE_DOMAINS: {
      return [...action.domains, ...state].reduce((accumulated, domain) => {
        const index = accumulated.findIndex(d => d.uri === domain.uri);

        if (index === -1) {
          return [...accumulated, domain];
        }

        return [
          // from the start to the one we want to deleted
          ...accumulated.slice(0, index),
          domain,
          // Often the deleted one, to the end
          ...accumulated.slice(index + 1),
        ];
      }, []);
    }
    case RECEIVE_DOMAIN: {
      const index = state.findIndex(domain => domain.uri === action.uri);

      if (index === -1) {
        const { id, uri, httpMethod, metrics } = action;
        return [{ id, uri, httpMethod, metrics }, ...state];
      }

      return [
        ...state.slice(0, index), // left parth
        { ...state[index], id: action.id, metrics: action.metrics },
        ...state.slice(index + 1), // right part
      ];
    }
    case RECEIVE_DOMAIN_METRICS: {
      const { uri, metrics } = action;
      const index = state.findIndex(domain => domain.uri === uri);

      if (index === -1) {
        return state;
      }

      return [
        ...state.slice(0, index), // left parth
        { ...state[index], metrics: metrics[uri] },
        ...state.slice(index + 1), // right part
      ];
    }

    case DELETE_DOMAIN: {
      console.log('action.id inside reducers', action.id)
      return state.filter(domain => domain.id !== action.id)
    }
    default:
      return state;
  }
}

export default domains;
