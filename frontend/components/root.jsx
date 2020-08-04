import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { WindowDimensionProvider } from './providers';

import App from './app';

export default ({ store }) => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <WindowDimensionProvider>
          <App />
        </WindowDimensionProvider>
      </BrowserRouter>
    </Provider>
  );
};
