import { Route, Routes } from 'react-router-dom';
import './App.css';

import Link1 from './components/views/LandingPage/Link1';
import Main from './components/views/LandingPage/Main';
import Layout from './components/views/Layout/index';
import Login from './components/views/UsersPage/Login';
import Register from './components/views/UsersPage/Register';
import Auth from './hoc/auth';

// HOC

function App() {
  //null = 

  const RegisterPage = Auth(Register, false);
  const LoginPage = Auth(Login, false);
  const MainPage = Auth(Main, null);
  const Link1Page = Auth(Link1, true);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path="/link1" element={<Link1Page />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
