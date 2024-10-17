import React from 'react';
import FunctionChain from './components/FunctionChain';
import { FUNCTIONS } from "./utils/func.js";

function App() {
  return (
    <div className="App">
      <FunctionChain functions={FUNCTIONS} />
    </div>
  );
}

export default App;
