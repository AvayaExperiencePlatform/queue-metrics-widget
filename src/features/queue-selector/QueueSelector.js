import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { setChannel, setSelectedAttributes, setSelectedQueues } from './queueSelectorSlice';
import { List, Select, SelectOption, Tooltip, IconButton } from '@avaya/neo-react';
import './QueueSelector.module.css';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#e53935',
    },
  },
});

export function QueueSelector() {
  const dispatch = useDispatch();

  const allQueues = useSelector(({ queueSelector }) => queueSelector.queues);
  const allAttributes = useSelector(({ queueSelector }) => queueSelector.attributes);

  const selectedQueues = useSelector(({ queueSelector }) => queueSelector.selectedQueues);
  const selectedAttributes = useSelector(({ queueSelector }) => queueSelector.selectedAttributes);

  const channel = useSelector(({ queueSelector }) => queueSelector.channel);

  const handleAddNewQueue = () => {
    dispatch(setSelectedQueues([...selectedQueues, {}]));
  };

  const handleRemoveQueue = (event, queueIndex) => {
    let queues = JSON.parse(JSON.stringify(selectedQueues));
    queues.splice(queueIndex, 1);
    dispatch(setSelectedQueues(queues));
  };

  const handleUpdateQueue = (event, queueIndex, queueId) => {
    let queues = JSON.parse(JSON.stringify(selectedQueues));
    queues[queueIndex] = { queueId };
    dispatch(setSelectedQueues(queues));
  };

  const handleChannelChange = value => {
    dispatch(setChannel(value));
  };

  const handleSetAttributes = (event, value) => {
    dispatch(setSelectedAttributes(value));
  };

  return (
    allQueues && (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth={false}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '1%',
              gap: '1%',
            }}
          >
            <Select
              label={'Channel'}
              aria-label={'channel'}
              value={channel}
              id="channel-select"
              onChange={value => {
                handleChannelChange(value);
              }}
              style={{ width: '100%' }}
            >
              {['Email', 'Voice', 'Messaging', 'Chat'].map(channel => (
                <SelectOption key={channel} style={{ width: '100%' }} value={channel.toLowerCase()}>
                  {channel}
                </SelectOption>
              ))}
            </Select>
            <Select
              label={'Attributes'}
              aria-label={'attributes'}
              value={selectedAttributes}
              id="select-att"
              multiple
              searchable
              onChange={value => {
                if (value != selectedAttributes) handleSetAttributes(null, value);
              }}
              style={{ width: '100%' }}
            >
              {allAttributes.map(att => (
                <SelectOption key={att.name} style={{ width: '100%' }} value={att.name}>
                  {att.name}
                </SelectOption>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {selectedQueues && selectedQueues.length > 0 && (
              <List itemType="ListSection" id="metrics-q-list">
                {selectedQueues.map((queue, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 0.1fr 0.1fr',
                      padding: '1%',
                      width: '100%',
                    }}
                  >
                    <Select
                      label={'Queue'}
                      aria-label={'queue'}
                      value={queue.queueId}
                      id="metrics-select-q"
                      onChange={value => {
                        if (value != queue.queueId) handleUpdateQueue(null, i, value);
                      }}
                      style={{ width: '100%' }}
                    >
                      {allQueues
                        .filter(q => q.queueId == queue.queueId || !selectedQueues.map(q => q.queueId).includes(q.queueId))
                        .map(q => (
                          <SelectOption key={q.queueId} style={{ width: '100%' }} value={q.queueId}>
                            {q.name}
                          </SelectOption>
                        ))}
                    </Select>
                    <div />
                    <Tooltip
                      key={i}
                      label="Delete Queue"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <IconButton
                        key={i}
                        onClick={ev => handleRemoveQueue(ev, i)}
                        aria-label="del q"
                        icon="trash"
                        id="btn-del-q"
                        variant="secondary"
                        status="alert"
                      />
                    </Tooltip>
                  </div>
                ))}
              </List>
            )}
            {selectedQueues && selectedQueues.length < 5 && (
              <IconButton aria-label="Add Queue" label="Add Queue" onClick={handleAddNewQueue} id="add-q" variant="secondary" icon="add" />
            )}
          </div>
        </Container>
      </ThemeProvider>
    )
  );
}
