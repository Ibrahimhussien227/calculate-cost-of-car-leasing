import React from "react";
import Calculator from "./components/Calculator";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
};

export default App;
