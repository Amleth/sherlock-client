import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import Home from './Home'
import About from './About'
import DescribeSherlockId from './features/navigation/SherlockId'
import DescribeUri from './features/navigation/Uri'
import DescribeTweet from './features/navigation/Tweet'
import YasguiC from './features/yasgui/YasguiC'
import Mei from './features/viewers/mei/Mei'
import { User } from './features/user/User'
import { Login } from './features/user/Login'
import AuthenticatedRoute from './common/AuthenticatedRoute'
import UnauthenticatedRouteOnly from './common/UnauthenticatedRouteOnly'
import React from 'react'
import theme from './SherlockMuiTheme'

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={'/' + process.env.REACT_APP_BASENAME}>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} exact />
          <Route path="/id/:id/:view?" component={DescribeSherlockId} exact />
          <Route path="/describe/:uri/:view?" component={DescribeUri} exact />
          <Route path="/tweet/:userScreenName/:statusId/:view?" component={DescribeTweet} exact />
          <Route path="/yasgui" component={YasguiC} exact />
          <Route path="/mei/:id" component={Mei} exact />
          <Route path="/mei" component={Mei} exact />
          <AuthenticatedRoute path="/me" component={User} exact />
          <UnauthenticatedRouteOnly path="/login" component={Login} exact />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default App
