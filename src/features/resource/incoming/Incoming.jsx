/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchIncoming } from './incomingSlice'
import { formatSection } from '../helpers_view'

const C = ({ resourceUri }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIncoming(resourceUri))
  }, [dispatch, resourceUri])

  const incoming = useSelector(state => state.tweets.entities[resourceUri])

  return !incoming ? (
    <div style={{ fontFamily: 'monospace' }}>🐌</div>
  ) : (
    formatSection('Triplets entrants', 'prédicat', 'sujet', 'graphe', incoming.data, 's')
  )
}

export default C
