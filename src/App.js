import { Route, Routes } from 'react-router-dom';
import './App.css';

import Link1 from './components/views/LandingPage/Link1';
import Main from './components/views/LandingPage/Main';
import Layout from './components/views/Layout/index';
import Login from './components/views/UsersPage/Login';

function App() {
  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Main/>} />
      </Routes> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}/>
          <Route path="/link1" element={<Link1 />}/>
          <Route path="/login" element={<Login />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
