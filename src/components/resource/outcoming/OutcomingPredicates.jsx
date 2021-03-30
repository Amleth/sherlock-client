/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { sparqlEndpoint } from '../../../common/sparql'
import query from './query'
import { restructureSparqlResults, separateSparqlResults } from '../helpers_rdf'
import { formatSection } from '../helpers_view'
import { RDF_BASE, getCode } from '../../../common/rdf'

const C = ({ resourceUri }) => {
  const [outcomingIdentityPredicatesResults, setOutcomingIdentityPredicatesResults] = useState({})
  const [outcomingPredicatesResults, setOutcomingPredicatesResults] = useState({})
  const [codes, setCodes] = useState([])

  useEffect(() => {
    sparqlEndpoint(query(resourceUri)).then((outcomingPredicatesRes) => {
      let { i, s } = separateSparqlResults(outcomingPredicatesRes.results.bindings)

      i = restructureSparqlResults(i, 'o')
      setOutcomingIdentityPredicatesResults(i)

      s = restructureSparqlResults(s, 'o')
      setOutcomingPredicatesResults(s)

      if (i[RDF_BASE + 'type']) {
        setCodes(Object.keys(i[RDF_BASE + 'type']).map(getCode))
      }
    })
  }, [resourceUri])

  return (
    <>
      {Object.entries(outcomingIdentityPredicatesResults).length > 0 && formatSection('Identité de la ressource', 'prédicat', 'objet', 'graphe', outcomingIdentityPredicatesResults, 'o', codes)}
      {Object.entries(outcomingPredicatesResults).length > 0 && formatSection('Triplets <ressource—prédicat—objet>', 'prédicat', 'objet', 'graphe', outcomingPredicatesResults, 'o')}
    </>
  )
}

export default C
