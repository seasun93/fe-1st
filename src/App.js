import { Route, Routes } from 'react-router-dom';
import './App.css';

import BdView from './components/views/BoardPage/BdView';
import BdWrite from './components/views/BoardPage/BdWrite';
import Board from './components/views/BoardPage/Board';
import Main from './components/views/LandingPage/Main';
import Layout from './components/views/Layout/index';
import PfView from './components/views/PortfolioPage/PfView';
import Portfolio from './components/views/PortfolioPage/Portfolio';
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
  const BoardPage = Auth(Board, null)
  const MypagePage = Auth(Mypage, true)
  const EditPage = Auth(Edit, true)
  const PortfolioPage = Auth(Portfolio, null);
  const PfViewPage = Auth(PfView, null);
  const BdWritePage = Auth(BdWrite, true);
  const BdViewPage = Auth(BdView, null);

  return (
    <div className="view">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/mypage" element={<MypagePage />}/>
          <Route path="/edit" element={<EditPage />}/>
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/view/:idx" element={<PfViewPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/view/:idx" element={<BdViewPage />} />
          <Route path="/board/write/" element={<BdWritePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
