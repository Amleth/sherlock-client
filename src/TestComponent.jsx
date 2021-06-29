import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { makeIdentityQueryFragment } from './common/rdf'
import { sparqlEndpoint } from './common/sparql'

const C = () => {
  const { id } = useParams()

  const Q = makeIdentityQueryFragment('http://data-iremus.huma-num.fr/id/' + id, true, null, true, true)

  const [response, setResponse] = useState()

  useEffect(() => {
    sparqlEndpoint(Q).then(response => {
      setResponse(response.results.bindings)
    })
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <pre style={{ margin: 0 }}>{Q}</pre>
      <div>
        <pre style={{ borderLeft: '1px solid hotpink', margin: 0 }}>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  )
}

export default C
