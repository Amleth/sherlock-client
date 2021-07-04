/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeTable } from '../helpers_view'
import { header } from '../Resource.css'
import { fetchIncoming } from './incomingSlice'

const C = ({ resourceUri }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchIncoming(resourceUri))
  }, [dispatch, resourceUri])

  const incoming = useSelector(state => state.incoming.entities[resourceUri])

  if (!incoming) {
    return <div style={{ fontFamily: 'monospace' }}>🐌</div>
  } else {
    return (
      <>
        <header css={header}>
          <h2>INCOMING PREDICATES</h2>
        </header>
        {makeTable(incoming.data)}
      </>
    )
  }
}

export default C
