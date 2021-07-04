import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { makeIdentityQueryFragment } from './common/rdf'
import { sparqlEndpoint } from './common/sparql'
import SparqlResultsTable from './common/SparqlResultsTable'

const C = ({ location }) => {
  const { id } = useParams()
  const qp = queryString.parse(location.search)
  const count = parseInt(qp.count) ? true : false
  const lr = parseInt(qp.lr) ? true : false

  const Q = makeIdentityQueryFragment('http://data-iremus.huma-num.fr/id/' + id, lr, null, true, count)

  const [bindings, setBindings] = useState([])

  useEffect(() => {
    sparqlEndpoint(Q).then(response => {
      setBindings(response.results.bindings)
    })
  }, [Q])

  return (
    <>
      <pre style={{ margin: 0 }}>{Q}</pre>
      <SparqlResultsTable bindings={bindings} />
    </>
  )
}

export default C
