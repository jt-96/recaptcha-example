import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

//For this example we use React-Router.
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>   
    </div>
  );
}

export default App;
