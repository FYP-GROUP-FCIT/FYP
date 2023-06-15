import './App.css';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';
import RouteComponent from './router';
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <RouteComponent />
      </Router>
    </>
  );
}

export default App;
