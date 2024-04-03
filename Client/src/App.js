import React from 'react';
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
} from "react-router-dom";
import Home from './home.js';
import Long from './long.js'; 
import Short from './short.js'; 

const App = () => {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/long" element={<Long />} />
              <Route path="/short" element={<Short />} />
          </Routes>
      </Router>
  );
}

export default App;