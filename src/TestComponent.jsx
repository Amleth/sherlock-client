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

  const Q = makeIdentityQueryFragment('http://data-iremus.huma-num.fr/id/' + id, lr, "http://www.cidoc-crm.org/lrmoo/R3_is_realised_in", true, count)

  const [response, setResponse] = useState()

  useEffect(() => {
    sparqlEndpoint(Q).then(response => {
      setResponse(response.results.bindings)
    })
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <pre style={{ margin: 0 }}>{Q}</pre>
      <pre style={{ backgroundColor: 'aquamarine', color: 'black', margin: 0 }}>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  )
}

export default C
