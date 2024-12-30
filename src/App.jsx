import React from "react";
import { BrowserRouter as Router } from "react-router";
import AppRouter from "./router";
import Header from "./components/Header";
import { FileProvider } from "./contexts/FileContext";

//El comienzo de toda la aplicacion
const App = () => {
  return (
    //Mantiene un estado globlal que se pueda utilizar en cualquier parte de la aplicacion
    <FileProvider>
      <Router>
        <Header />
        <AppRouter />
      </Router>
    </FileProvider>
  );
};

export default App;

/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App */
