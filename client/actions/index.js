// add domain
import axios, { post, get } from 'axios';

export const ADD_DOMAIN = 'ADD_DOMAIN';
export const RECEIVE_DOMAIN = 'RECEIVE_DOMAIN';
export const RECEIVE_DOMAINS = 'RECEIVE_DOMAINS';
export const RECEIVE_DOMAIN_METRICS = 'RECEIVE_DOMAIN_METRICS';
export const DELETE_DOMAIN = 'DELETE_DOMAIN'

axios.defaults.baseURL = 'http://localhost:4000/api/v1';

function offlineAddDomain({ id, uri, httpMethod }) {
  return {
    type: ADD_DOMAIN,
    id,
    uri,
    httpMethod,
    metrics: [],
  };
}

function receiveDomain({ id, uri, httpMethod, metrics }) {
  return {
    type: RECEIVE_DOMAIN,
    id,
    uri,
    httpMethod,
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
    return post('/domains', requestData)
      .then(responseData => dispatch(receiveDomain(responseData.data)));
  };
}

export function fetchDomains() {
  return dispatch => get('/domains')
      .then(responseData => dispatch(receiveDomains(responseData.data)));
}

export function receiveDomainMetrics({ uri, metrics }) {
  return {
    type: RECEIVE_DOMAIN_METRICS,
    uri,
    metrics,
  };
}

function deleteDomain({id}) {
  return {
    type: DELETE_DOMAIN,
    id
  }
}

export const removeDomain = (id) => dispatch => {
  return axios.delete(`/domains/${id}`)
    .then(status => dispatch(deleteDomain(id)))
    .catch(console.error)
}

