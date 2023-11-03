import { Route, Routes } from 'react-router-dom';
import './App.css';

import Board1 from './components/views/LandingPage/Board1';
import Link1 from './components/views/LandingPage/Link1';
import Main from './components/views/LandingPage/Main';
import Layout from './components/views/Layout/index';
import Edit from './components/views/UsersPage/Edit';
import Login from './components/views/UsersPage/Login';
import Mypage from './components/views/UsersPage/Mypage';
import Register from './components/views/UsersPage/Register';
import Auth from './hoc/auth';

// HOC

function App() {
  // null = 회원 관계 유무 접근 가능
  // false = 회원이 이용 할 수 없는 페이지
  // true = 회원만 이용 할 수 있는 페이지

  const RegisterPage = Auth(Register, false);
  const LoginPage = Auth(Login, false);
  const MainPage = Auth(Main, null);
  const Link1Page = Auth(Link1, true, true);
  const Board1Page = Auth(Board1, null)
  const MypagePage = Auth(Mypage, true)
  const EditPage = Auth(Edit, true)

  return (
    <div className="view">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path="/link1" element={<Link1Page />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/mypage" element={<MypagePage />}/>
          <Route path="/edit" element={<EditPage />}/>
          <Route path="/portfolio" element={<Board1Page />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
