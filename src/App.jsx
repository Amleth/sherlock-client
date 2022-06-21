import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './Home'
import About from './About'
import DescribeSherlockId from './features/navigation/SherlockId'
import DescribeUri from './features/navigation/Uri'
import DescribeTweet from './features/navigation/Tweet'
import YasguiC from './features/yasgui/YasguiC'
import { User } from './features/user/User'
import { Login } from './features/user/Login'
import AuthenticatedRoute from './common/AuthenticatedRoute'
import UnauthenticatedRouteOnly from './common/UnauthenticatedRouteOnly'
import React from 'react'
import TestComponent from './TestComponent'

const App = () => {
  return (
    <BrowserRouter basename={'/' + process.env.REACT_APP_BASENAME}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/id/:id/:view?" element={<DescribeSherlockId />} />
        <Route path="/describe/:uri/:view?" element={<DescribeUri />} />
        <Route path="/tweet/:userScreenName/:statusId/:view?" element={<DescribeTweet />} />
        <Route path="/yasgui" element={<YasguiC />} />
        <Route path="/test/:id" element={<TestComponent />} />
        {/* <AuthenticatedRoute path="/me" element={User} /> */}
        {/* <UnauthenticatedRouteOnly path="/login" element={Login} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App

//TODO https://reactrouter.com/docs/en/v6/upgrading/v5
//TODO https://reactrouter.com/docs/en/v6/examples/auth
