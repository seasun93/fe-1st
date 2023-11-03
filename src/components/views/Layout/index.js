import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './footer';
import Header from './header';

function Layout(props) {

    return (
        <div className="layout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout