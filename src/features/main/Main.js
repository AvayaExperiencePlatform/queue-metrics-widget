import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Box, CssBaseline } from '@mui/material';
import { TopNav, Icon } from '@avaya/neo-react';
import { getInteractionDetailsThunk, getAgentDetailsThunk, setCurrentInteractionState } from './mainSlice';
import { subscribeToInteractionState } from './mainAPI';
import { MainContainer } from '../../shared-components/MainContainer';
import { Metrics } from '../metrics/Metrics';
import { QueueSelector } from '../queue-selector/QueueSelector';
import { getAttributesThunk, getQueuesThunk, setChannel, setSelectedAttributes } from '../queue-selector/queueSelectorSlice';
import initAuth from '../../services/Auth';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#e53935',
    },
  },
});

export function Main(props) {
  const dispatch = useDispatch();
  const agent = useSelector(({ main }) => main.agent);
  const interaction = useSelector(({ main }) => main.interaction);
  const interactionId = props.interactionId;

  useEffect(() => {
    const loadData = () => {
      initAuth({ dispatch }).then(response => {
        if (response) {
          dispatch(getQueuesThunk());
          dispatch(getAttributesThunk());
        } else {
          console.error('Error occured in AXP API Auth...');
        }
      });
    };
    loadData();
  }, []);

  useEffect(() => {
    subscribeToInteractionState(data => {
      dispatch(setCurrentInteractionState(data));
    });
    if (interactionId && !interaction) dispatch(getInteractionDetailsThunk({ interactionId }));
    if (!agent) dispatch(getAgentDetailsThunk());

    if (interaction) {
      dispatch(setChannel(interaction.channel?.toLowerCase()));
      dispatch(setSelectedAttributes(interaction.attributes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent, interaction]);

  return (
    <ThemeProvider theme={theme}>
      <TopNav
        logo={
          <div style={{ padding: '12px' }}>
            <Icon aria-label="analytics" icon="analytics" size="md" />
          </div>
        }
        title="Queue Metrics"
      />
      <Container component="main" maxWidth={false}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: 8,
          }}
        >
          <MainContainer title="Select Queues">
            <QueueSelector></QueueSelector>
          </MainContainer>
          <Metrics></Metrics>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

Main.propTypes = {
  interactionId: PropTypes.string,
};
