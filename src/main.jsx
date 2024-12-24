import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import MaterialTheme from './provider/MaterialTheme';
import router from './route/route';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={MaterialTheme}>
      <CssBaseline />
      <Provider store={Store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
