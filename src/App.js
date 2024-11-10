import {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Body from './components/Body';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div>
      <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
      <Body darkMode={darkMode}/>
    </div>
  );
}

export default App;
