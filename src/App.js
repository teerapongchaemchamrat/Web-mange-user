import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/login';
import LayoutPage from './components/layout';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<LayoutPage />}/> 
      </Routes>
    </div>
  );
}

//export default App;
