import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Doma1 from "./pages/doma1"
import Doma2 from "./pages/doma2"
import Menu from "./pages/menu"

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Doma1 />}></Route>
        <Route path='/doma2' element={<Doma2 />}></Route>
        <Route path='/menu' element={<Menu />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
