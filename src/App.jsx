import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/sherlock/Home'
import About from './components/sherlock/About'
import DescribeSherlockId from './components/resource/DescribeSherlockId'
import DescribeUri from './components/resource/DescribeUri'
import Yasgui from './components/Yasgui'
import Mei from './components/viewers/Mei'

const App = () => {
  return (
    <Router basename={'/' + process.env.REACT_APP_BASENAME}>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/id/:id" component={DescribeSherlockId} exact />
      <Route path="/describe/:uri" component={DescribeUri} exact />
      <Route path="/yasgui" component={Yasgui} exact />
      <Route path="/mei" component={Mei} exact />
    </Router>
  )
}

export default App
