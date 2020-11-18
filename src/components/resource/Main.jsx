import { useState, useEffect } from 'react'
import {
  formatBinding,
  restructureSparqlResults,
  separateSparqlResults,
} from './helper'
import { sparqlEndpoint } from '../../common/sparql'

const query = resourceUri => `
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT *
WHERE {
  {
    GRAPH ?g {
      <${resourceUri}> ?p ?o .
      OPTIONAL {
        GRAPH ?opl_g {
          ?o ?o_p_label ?o_label .
          FILTER (?o_p_label IN (
            dcterms:title,
            foaf:name,
            skos:prefLabel,
            rdfs:label
          ))
        }
      }
    }
    FILTER (!isBlank(?o))
  }
}
`

const C = ({ resourceUri }) => {
  resourceUri = decodeURIComponent(resourceUri)

  // i => results carrying triples which denote the identity of the resource
  // s => results carrying triples of which the resource is subject

  const [iResults, setIResults] = useState({})
  const [sResults, setSResults] = useState({})

  useEffect(() => {
    ;(async () => {
      const res = await sparqlEndpoint(query(resourceUri))
      let { i, s } = separateSparqlResults(res.results.bindings)
      i = restructureSparqlResults(i)
      setIResults(i)
      s = restructureSparqlResults(s)
      setSResults(s)
    })()
  }, [resourceUri])

  return (
    <div className='resource'>
      <header>
        <div>Ressource</div>
        <h1>{resourceUri}</h1>
      </header>
      {formatSection(
        'Identité de la ressource',
        'prédicat',
        'objet',
        'graphe',
        iResults,
      )}
      {formatSection(
        'Triplets dont la ressource est sujet',
        'prédicat',
        'objet',
        'graphe',
        sResults,
      )}
      <section>
        <header>
          <h2>Triplets dont la ressource est objet</h2>
        </header>
      </section>
    </div>
  )
}

export default C

////////////////////////////////////////////////////////////////////////////////
//
// HELPERS
//
////////////////////////////////////////////////////////////////////////////////

function formatSection(title, col1, col2, col3, results) {
  return (
    <section>
      <header>
        <h2>{title}</h2>
      </header>
      <table>
        <thead>
          <tr>
            <th>{col1}</th>
            <th>{col2}</th>
            <th>{col3}</th>
          </tr>
        </thead>
        <tbody>{formatResults(results)}</tbody>
      </table>
    </section>
  )
}

function formatResults(results) {
  let i = 0
  return Object.entries(results).map(([p, data]) =>
    Object.entries(data).map(([o, bindings]) => {
      switch (bindings[0].o.type) {
        case 'literal':
          return (
            <tr key={i++}>
              <td>{formatBinding(bindings[0].p)}</td>
              <td>{formatBinding(bindings[0].o)}</td>
              <td>{formatBinding(bindings[0].g)}</td>
            </tr>
          )
        case 'uri':
          if (bindings.length === 1) {
            return (
              <tr key={i++}>
                <td>{formatBinding(bindings[0].p)}</td>
                <td>
                  <div>{formatBinding(bindings[0].o)}</div>
                  {bindings[0].hasOwnProperty('o_label') && (
                    <div className='oLabels'>
                      {formatBinding(bindings[0].o_label)}
                    </div>
                  )}
                </td>
                <td>{formatBinding(bindings[0].g)}</td>
              </tr>
            )
          } else {
            return (
              <tr key={i++}>
                <td>{formatBinding(bindings[0].p)}</td>
                <td>
                  <div>{formatBinding(bindings[0].o)}</div>
                  <div className='oLabels'>
                    {bindings
                      .map(_ => (
                        <span key={i++}>{formatBinding(_.o_label)}</span>
                      ))
                      .reduce((prev, curr) => [
                        prev,
                        <span className='label-separator' key={curr}>
                          &nbsp;•{' '}
                        </span>,
                        curr,
                      ])}
                  </div>
                </td>
                <td>{formatBinding(bindings[0].g)}</td>
              </tr>
            )
          }
        default:
          return ''
      }
    }),
  )
}
