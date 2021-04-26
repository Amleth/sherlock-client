/** @jsxImportSource @emotion/react */
import { formatSection } from '../helpers_view'
import { getCode, RDF_BASE } from '../../../common/rdf'
import { useSelector } from 'react-redux'
import { getIdentity } from '../helpers_rdf'

const C = ({ resourceUri }) => {
  const outgoing = useSelector(state => state.outgoing.entities[resourceUri])

  if (!outgoing) {
    return <div style={{ fontFamily: 'monospace' }}>🐌</div>
  } else {
    const identity = getIdentity(outgoing.data)
    return (
      <>
        {Object.entries(identity).length > 0 &&
          formatSection(
            'Identité de la ressource',
            'prédicat',
            'objet',
            'graphe',
            identity,
            'o',
            identity[RDF_BASE + 'type'] ? Object.keys(identity[RDF_BASE + 'type']).map(getCode) : []
          )}
        {Object.entries(outgoing.data).length > 0 &&
          formatSection('Triplets sortants', 'prédicat', 'objet', 'graphe', outgoing.data, 'o')}
      </>
    )
  }
}

export default C
