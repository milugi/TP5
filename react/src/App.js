import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Cargar from './pages/Cargar';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Marvel from './pages/Marvel';
import DC from './pages/DC';
import Actualizar from './pages/Actualizar';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cargar' element={<Cargar/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/marvel' element={<Marvel/>}/>
          <Route path='/dc' element = {<DC/>}/>
          <Route path='/actualizar/:id' element = {<Actualizar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

