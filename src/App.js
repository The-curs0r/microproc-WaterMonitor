import React,{useState,useEffect} from 'react';
import {Button} from 'react-bootstrap'
import './App.css';
import Water from './components/Water'
function App() {
    const [mode,setMode]=useState(0);

  return (
    <div className="wrap">
        <div className={mode?'App light':'App dark'}>
            <Button variant="primary" onClick={(e)=>{e.preventDefault();setMode(!mode)}} style={{marginTop:'20px'}}>{(mode)?'Dark Mode':'Light Mode'}</Button>
            <Water />
        </div>
    </div>  
  );
}

export default App;
