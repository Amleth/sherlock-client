/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { formatSection } from '../helpers_view'
import { RDF_BASE, getCode } from '../../../common/rdf'
import { fetchOutgoing } from './outgoingSlice'

const C = ({ resourceUri }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOutgoing(resourceUri))
  }, [dispatch, resourceUri])

  const data = useSelector((state) => state.outgoing.entities[resourceUri])

  return !data ? (
    <div style={{ fontFamily: 'monospace' }}>Chargement...</div>
  ) : (
    <>
      {Object.entries(data.identity).length > 0 && formatSection('Identité de la ressource', 'prédicat', 'objet', 'graphe', data.identity, 'o', data.identity[RDF_BASE + 'type'] ? Object.keys(data.identity[RDF_BASE + 'type']).map(getCode) : [])}
      {Object.entries(data.outgoing).length > 0 && formatSection('Triplets <ressource—prédicat—objet>', 'prédicat', 'objet', 'graphe', data.outgoing, 'o')}
    </>
  )
}

export default C
