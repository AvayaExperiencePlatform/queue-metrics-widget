import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

export function MainContainer(props) {
  return (
    <div
      style={{
        width: '100%',
        display: 'block',
        backgroundColor: 'rgb(241, 241, 241)',
        padding: '15px',
        marginBottom: '8px',
      }}
    >
      <Typography component="div" variant="h6" sx={{ fontFamily: 'noto-sans,sans-serif', marginBottom: '10px', textAlign: 'center' }}>
        {props.title}
      </Typography>
      <div>{props.children}</div>
    </div>
  );
}

MainContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
