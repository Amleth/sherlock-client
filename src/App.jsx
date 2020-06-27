/** @jsx jsx */

import { jsx } from '@emotion/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './view/components/Home'
import About from './view/components/About'
import SkosConceptSchemes from './view/components/SkosConceptSchemes'
import Resource from './view/components/Resource'
import { IN, OUT } from './view/style'

export default () => {
  return (
    <Router basename='/sherlock'>
      <header
        css={{
          alignItems: 'center',
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 111,
          textAlign: 'center'
        }}
      >
        <Link
          to='/'
          css={{
            '&:hover': {
              textDecoration: 'none !important'
            }
          }}
        >
          <h1
            css={{
              color: 'white',
              fontWeight: 'normal',
              letterSpacing: 8,
              transition: `color ${OUT}`,
              '&:hover': { color: 'DarkTurquoise', transition: `color ${IN}` }
            }}
          >
            <div>SHERLOCK</div>
          </h1>
        </Link>
      </header>
      <Route path='/' component={Home} exact />
      <Route path='/about' component={About} exact />
      <Route path='/skosconceptschemes' component={SkosConceptSchemes} exact />
      <Route path='/id/:id' component={Resource} exact />
    </Router>
  )
}
