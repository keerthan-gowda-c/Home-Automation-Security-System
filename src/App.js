
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import AdminDashboard from './Component/AdminDashboard';
import Approveusers from './Component/Approveusers';
import Viewlogs from './Component/Viewlogs';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='AdminDashboard' element={<AdminDashboard />}>
            <Route path='Approveusers' element={<Approveusers />}></Route>
            <Route path='Viewlogs' element={<Viewlogs/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
