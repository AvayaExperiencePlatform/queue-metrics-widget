import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Main } from './features/main/Main';

function App(props) {
  return (
    <div className="app-container">
      <div className="app-container-body">
        <Main interactionId={props.interactionId}></Main>
      </div>
    </div>
  );
}

App.propTypes = {
  interactionId: PropTypes.string,
};

export default App;
