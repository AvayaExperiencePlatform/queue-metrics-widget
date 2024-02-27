import axios from 'axios';
import process from '../../app/config';

export function listQueues({ pageSize, pageNumber }) {
  const config = {
    method: 'get',
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/match/v1/accounts/${process.env.AXP_ACCOUNT_ID}/queues`,
    params: { pageSize, pageNumber },
    headers: {
      appkey: process.env.AXP_API_APP_KEY,
    },
  };
  return axios(config).then(response => {
    return response.data;
  });
}

export function listAttributes({ pageSize, pageNumber }) {
  const config = {
    method: 'get',
    url: `${process.env.AXP_PROXY_BASE_URL}/api/admin/match/v1/accounts/${process.env.AXP_ACCOUNT_ID}/categories`,
    params: { pageSize, pageNumber },
    headers: {
      appkey: process.env.AXP_API_APP_KEY,
    },
  };
  return axios(config).then(response => {
    return response.data;
  });
}
