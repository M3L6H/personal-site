import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { WindowDimensionProvider } from "./providers";

import App from "./app";

const Root = ({ store }) => {
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

Root.displayName = "Root";

export default Root;
