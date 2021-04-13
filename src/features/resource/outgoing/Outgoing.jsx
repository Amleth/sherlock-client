/** @jsxImportSource @emotion/react */
import { formatSection } from '../helpers_view'
import { RDF_BASE, getCode } from '../../../common/rdf'

const C = ({ identity, outgoing }) => {
  return !identity || !outgoing ? (
    <div style={{ fontFamily: 'monospace' }}>Chargement...</div>
  ) : (
    <>
      {Object.entries(identity.data).length > 0 && formatSection('Identité de la ressource', 'prédicat', 'objet', 'graphe', identity.data, 'o', identity.data[RDF_BASE + 'type'] ? Object.keys(identity.data[RDF_BASE + 'type']).map(getCode) : [])}
      {Object.entries(outgoing.data).length > 0 && formatSection('Triplets <ressource—prédicat—objet>', 'prédicat', 'objet', 'graphe', outgoing.data, 'o')}
    </>
  )
}

export default C
