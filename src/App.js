import React, { useState } from 'react';
import Main from './Components/Main'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import FavPage from './Components/FavPage';


function App() {
    const [lists, setLists] = useState([]);
  
    return (
      <div>
        <Routes>
          <Route path='*' element={<Main lists={lists} setLists={setLists} />} />
          <Route path='/favorites' element={<FavPage lists={lists} />} />
        </Routes>
      </div>
    );
  }
  
  export default App;