import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/sherlock/Home'
import About from './components/sherlock/About'
import DescribeSherlockId from './components/resource/DescribeSherlockId'
import DescribeUri from './components/resource/DescribeUri'
import YasguiC from './components/YasguiC'
import Mei from './components/viewers/Mei'

const App = () => {
  return (
    <Router basename={'/' + process.env.REACT_APP_BASENAME}>
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/id/:id/:view?" component={DescribeSherlockId} exact />
      <Route path="/describe/:uri/:view?" component={DescribeUri} exact />
      <Route path="/yasgui" component={YasguiC} exact />
      <Route path="/mei" component={Mei} exact />
    </Router>
  )
}

export default App
