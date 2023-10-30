import { Route, Routes } from 'react-router-dom';
import './App.css';

import Link1 from './components/views/LandingPage/Link1';
import Main from './components/views/LandingPage/Main';
import Layout from './components/views/Layout/index';
import Auth from './components/views/UsersPage/Auth';
import Login from './components/views/UsersPage/Login';
import Register from './components/views/UsersPage/Register';

// HOC

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={Auth(<Main />)}/>
          <Route path="/link1" element={<Link1 />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/auth" element={<Auth />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
