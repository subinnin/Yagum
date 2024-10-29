import React from 'react';
import {Route, Routes} from 'react-router-dom'

import Doma1 from "./pages/doma1"
import Doma2 from "./pages/doma2"

function App() {
  return (
      <Routes>
        <Route path='/' element={<Doma1 />}></Route>
        <Route path='/doma2' element={<Doma2 />}></Route>
      </Routes>

  );
}

export default App;
