import logo from './logo.svg';
import './App.css';
import Pay from './component/Pay';
import TableMoney from './component/TableMoney';
import { Button } from 'antd';
import { useState } from 'react';


function App() {
  const [mode, setMode] = useState(false)
  const handleMode = () => {
    const bgBox = document.querySelector('.box')
    if (mode) {
      bgBox.style.backgroundColor = '#2F3638'
    }
    else {
      bgBox.style.backgroundColor = 'white'
    }
    setMode(pre => !pre)
  }
  return (
    <div className='box' >
      <Pay />
      <br/>
      <Button onClick={handleMode}>Mode</Button>
    </div>
  );
}

export default App;
