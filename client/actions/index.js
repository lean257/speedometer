// add domain
import { post, get } from 'axios';

export const ADD_DOMAIN = 'ADD_DOMAIN';
export const RECEIVE_DOMAIN = 'RECEIVE_DOMAIN';
export const RECEIVE_DOMAINS = 'RECEIVE_DOMAINS';
export const RECEIVE_DOMAIN_METRIC = 'RECEIVE_DOMAIN_METRIC';

function offlineAddDomain({ id, uri, httpMethod }) {
  return {
    type: ADD_DOMAIN,
    id,
    uri,
    httpMethod,
    metrics: [],
  };
}

function receiveDomain({ id, uri, httpMethod, alternateId, metrics }) {
  return {
    type: RECEIVE_DOMAIN,
    id,
    uri,
    httpMethod,
    alternateId,
    metrics,
  };
}

function receiveDomains(domains) {
  return {
    type: RECEIVE_DOMAINS,
    domains,
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

export function fetchDomains() {
  return dispatch => get('/api/v1/domains')
      .then(responseData => dispatch(receiveDomains(responseData.data)));
}

export function receiveDomainMetric({ uri, duration, time }) {
  return {
    type: RECEIVE_DOMAIN_METRIC,
    uri,
    duration,
    time,
  };
}
