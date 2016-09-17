import { ADD_DOMAIN, RECEIVE_DOMAIN } from '../actions';

function domains(state = [], action) {
  console.log(action);
  switch(action.type) {
    case ADD_DOMAIN:
      let {id, uri, httpMethod} = action;
      return [{id, uri, httpMethod}, ...state];

    case RECEIVE_DOMAIN:
      let index = state.findIndex((domain) => {
        return domain.id == action.ref;
      });

      return [
        ...state.slice(0, index), // left parth
        {...state[index], id: action.id},
        ...state.slice(index + 1) // right part
      ]
    default:
      return state;
  }
}

export default domains;
