// add domain
import { post } from 'axios';

export const ADD_DOMAIN = 'ADD_DOMAIN';
export const RECEIVE_DOMAIN = 'RECEIVE_DOMAIN';

export function addDomain(id, uri, httpMethod) {
  return (dispatch) => {
    let requestData = {id, uri, httpMethod};
    dispatch(offlineAddDomain(requestData))
    return post('/api/v1/domain', requestData)
      .then(({data}) => dispatch(receiveDomain(data)))
  }
}

function offlineAddDomain({id, uri, httpMethod}) {
  return {
    type: ADD_DOMAIN,
    id,
    uri,
    httpMethod
  }
}
function receiveDomain({id, uri, httpMethod, ref}) {
  return {
    type: RECEIVE_DOMAIN,
    id,
    uri,
    httpMethod,
    ref
  }
}
