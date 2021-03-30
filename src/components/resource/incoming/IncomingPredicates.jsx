/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { sparqlEndpoint } from '../../../common/sparql'
import Q from './query'
import { restructureSparqlResults } from '../helpers_rdf'
import { formatSection } from '../helpers_view'

const C = ({ resourceUri }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    sparqlEndpoint(Q(resourceUri)).then((res) => {
      const _ = restructureSparqlResults(res.results.bindings, 's')
      setData(_)
    })
  }, [resourceUri])

  return formatSection('Triplets <sujet—prédicat—ressource>', 'prédicat', 'sujet', 'graphe', data, 's')
}

export default C
