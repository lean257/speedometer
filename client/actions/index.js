// add domain
import { post } from 'axios';

export const ADD_DOMAIN = 'ADD_DOMAIN';
export const RECEIVE_DOMAIN = 'RECEIVE_DOMAIN';

function offlineAddDomain({ id, uri, httpMethod }) {
  return {
    type: ADD_DOMAIN,
    id,
    uri,
    httpMethod,
    chartData: {
      labels: [],
      datasets: [{ data: [] }],
    },
  };
}

function receiveDomain({ id, uri, httpMethod, alternateId, chartData }) {
  return {
    type: RECEIVE_DOMAIN,
    id,
    uri,
    httpMethod,
    alternateId,
    chartData,
  };
}

export function addDomain(id, uri, httpMethod) {
  return (dispatch) => {
    const requestData = { id, uri, httpMethod };
    dispatch(offlineAddDomain(requestData));
    return post('/api/v1/domains', requestData)
      .then(responseData => dispatch(receiveDomain(responseData.data)));
  };
}
