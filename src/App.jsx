import { useState } from 'react';
import './App.css';
import TemperatureConverter from './TemperatureConverter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="container"> 
      <div className="header">
        <h1>Conversor de Temperatura</h1>
      </div>

      <div className="content">
        <TemperatureConverter />

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>
          Click on the Vite and React logos to learn more
        </p>
      </footer>
    </main>
  );
}

export default App;