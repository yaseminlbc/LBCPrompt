import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GlobalStyles } from '@mui/material';

function AppTheme({ children }) {
  const theme = React.useMemo(() => createTheme({}), []);

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
            overflowX: 'hidden',
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
};

export default AppTheme;
