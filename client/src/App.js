import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { LandingPage } from './pages/LandingPage';
import { ResultSearch } from './pages/ResultSearch'

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path={`/result/:params`} element={<ResultSearch/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
