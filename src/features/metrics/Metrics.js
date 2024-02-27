import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { getQueueMetricsThunk, setMetrics } from './metricsSlice';
import { Table } from '@avaya/neo-react';
import './Metrics.module.css';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#e53935',
    },
  },
});

export function Metrics() {
  const dispatch = useDispatch();

  const queues = useSelector(({ queueSelector }) => queueSelector.queues);
  const selectedQueues = useSelector(({ queueSelector }) => queueSelector.selectedQueues);
  const selectedAttributes = useSelector(({ queueSelector }) => queueSelector.selectedAttributes);

  const channel = useSelector(({ queueSelector }) => queueSelector.channel);

  const metrics = useSelector(({ metrics }) => metrics.metrics);

  const handleRefresh = () => {
    if (channel) {
      dispatch(setMetrics({}));
      selectedQueues.forEach(queue => {
        if (queue.queueId) dispatch(getQueueMetricsThunk({ queueId: queue.queueId, channel, attributes: selectedAttributes }));
      });
    }
  };

  useEffect(() => {
    if (channel)
      selectedQueues.forEach(queue => {
        if (queue.queueId) dispatch(getQueueMetricsThunk({ queueId: queue.queueId, channel, attributes: selectedAttributes }));
      });
  }, [selectedQueues, selectedAttributes]);

  return (
    metrics &&
    Object.values(metrics).length > 0 && (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={false}>
          <CssBaseline />
          <Table
            handleRefresh={handleRefresh}
            columns={[
              {
                Header: 'Queue',
                accessor: 'queueName',
                Cell: ({ row }) => {
                  return queues.find(queue => queue.queueId == row.original.id)?.name;
                },
              },
              ...Object.values(metrics)[0].map(metric => {
                return {
                  Header: metric.metricName,
                  disableSort: false,
                  Cell: ({ row }) => {
                    const values = row.original.values;
                    return values.find(item => item.metricName == metric.metricName)?.metricValue;
                  },
                };
              }),
            ]}
            data={Object.keys(metrics).map(key => {
              return {
                id: key,
                values: metrics[key],
              };
            })}
            showRowSeparator
            id="templated-table"
            rowHeight="large"
            selectableRows="none"
            showPagination
          ></Table>
        </Container>
      </ThemeProvider>
    )
  );
}
