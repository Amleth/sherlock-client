/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState, useEffect } from 'react'
import { APP_MARGIN } from '../style'
import { fetchSparqlQuery, PREFIXES } from '../../model/sparql'

const QUERY = `${PREFIXES}
SELECT * WHERE {
  GRAPH ?g {
    ?s crm:P2_has_type :bf9dce29-8123-4e8e-b24d-0c7f134bbc8e .
    ?s ?p ?o .
  }
}
`

const MeiScores = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      let res = await fetchSparqlQuery(QUERY)
      setData(res)
    })()
  }, [])

  return (
    <div
      className={css`
        margin: ${APP_MARGIN}px;
      `}
    >
      <h1>MEI score</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default MeiScores
