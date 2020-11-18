import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/sherlock/Home'
import About from './components/sherlock/About'
import DescribeSherlockId from './components/resource/DescribeSherlockId'
import DescribeUri from './components/resource/DescribeUri'
// import MeiScores from './view/components/MeiScores'
// import SkosConceptSchemes from './view/components/SkosConceptSchemes'
// import Resource from './view/components/Resource'
// import ResourceNS from './view/components/ResourceNS'
const App = () => {
  return (
    <Router basename={'/' + process.env.REACT_APP_BASENAME}>
      <header>
        <Link to='/'>
          <h1>Sherlock</h1>
        </Link>
      </header>
      <Route path='/' component={Home} exact />
      <Route path='/about' component={About} exact />
      <Route path='/id/:id' component={DescribeSherlockId} exact />
      <Route path='/describe/:uri' component={DescribeUri} exact />
      {/* <Route path='/skosconceptschemes' component={SkosConceptSchemes} exact />
      <Route path='/meiscores' component={MeiScores} exact />
      <Route path='/ns/:path*' component={ResourceNS} exact />
      <Route path='/sparql' component={Test} exact /> */}
    </Router>
  )
}

export default App
