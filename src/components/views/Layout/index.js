import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
        <div className="nav">
            <ul>
                <Link to="/"> Home </Link>
                <Link to="/login"> login </Link>
                <Link to="/link1"> link1 </Link>
            </ul>
        </div>
        <Outlet />
    </div>
  )
}

export default Layout