import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { makeIdentityQueryFragment } from './common/rdf'
import { sparqlEndpoint } from './common/sparql'

const C = ({ location }) => {
  const { id } = useParams()
  const qp = queryString.parse(location.search)
  const count = parseInt(qp.count) ? true : false
  const lr = parseInt(qp.lr) ? true : false

  const Q = makeIdentityQueryFragment('http://data-iremus.huma-num.fr/id/' + id, lr, null, true, count)

  const [response, setResponse] = useState()

  useEffect(() => {
    sparqlEndpoint(Q).then(response => {
      setResponse(response.results.bindings)
    })
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <pre style={{ margin: 0 }}>{Q}</pre>
      <pre id="q" style={{ backgroundColor: 'aquamarine', color: 'black', margin: 0 }}>
        {JSON.stringify(response ? response.map(_ => (_.label ? _.label.value : "")) : '🦕', null, 2)}
      </pre>
    </div>
  )
}

export default C
