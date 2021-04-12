/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Yasgui from '@triply/yasgui'
import '@triply/yasgui/build/yasgui.min.css'

const q = 'SELECT (COUNT(*) as ?triples) ?g WHERE { GRAPH ?g { ?s ?p ?o } } GROUP BY ?g'

function YasguiC() {
  window.localStorage.removeItem('yagui__config')

  useEffect(() => {
    const yasgui = new Yasgui(document.getElementById('yasgui'), {
      requestConfig: {
        endpoint: process.env.REACT_APP_SHEROCK_SPARQL_ENDPOINT,
        method: 'POST',
      },
    })
    yasgui.getTab().setQuery(q)
    return () => {}
  }, [])

  return (
    <>
      <Link to="/">🏠</Link>
      <div
        css={css`
          background-color: white;
          color: black;
        `}
        id="yasgui"
      />
    </>
  )
}

export default YasguiC
