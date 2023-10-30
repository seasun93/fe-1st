import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
        <div className="nav">
            <ul>
                <Link to="/"> Home </Link>
                <Link to="/login"> login </Link>
                <Link to="/register"> sign in </Link>
                <Link to="/link1"> link1 </Link>
                <Link to="/auth"> 확인용 </Link>
            </ul>
        </div>
        <Outlet />
    </div>
  )
}

export default Layout