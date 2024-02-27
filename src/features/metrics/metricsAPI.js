import axios from 'axios';
import process from '../../app/config';

export function getQueueMetrics({ queueId, channel, attributes }) {
  const config = {
    method: 'get',
    url: `${process.env.AXP_PROXY_BASE_URL}/api/queue-metrics/v1/accounts/${process.env.AXP_ACCOUNT_ID}/queues/${queueId}/channels/${channel}/metrics`,
    params: { attributes: attributes?.join(',') },
    headers: {
      appkey: process.env.AXP_API_APP_KEY,
    },
  };
  return axios(config).then(response => {
    return response.data;
  });
}
