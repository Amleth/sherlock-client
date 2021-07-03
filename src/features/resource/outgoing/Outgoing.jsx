/** @jsxImportSource @emotion/react */
import { useSelector } from 'react-redux'

import { makeTable } from '../helpers_view'
import { header } from '../Resource.css'

const C = ({ resourceUri }) => {
  const outgoing = useSelector(state => state.outgoing.entities[resourceUri])

  if (!outgoing) {
    return <div style={{ fontFamily: 'monospace' }}>🐌</div>
  } else {
    return (
      <>
        <header css={header}>
          <h2>OUTGOING PREDICATES</h2>
        </header>
        {/* <pre>{JSON.stringify(outgoing, null, 4)}</pre> */}
        {makeTable(outgoing.data)}
      </>
    )
  }
}

export default C
