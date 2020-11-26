import { useState, useEffect } from 'react'
import {
  formatBinding,
  restructureSparqlResults,
  separateSparqlResults,
} from './helper'
import { sparqlEndpoint } from '../../common/sparql'
import { Selector } from '../viewers/Selector'

const outcomingPredicatesQuery = resourceUri => `
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
const incomingPredicatesQuery = resourceUri => `
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT *
WHERE {
  {
    GRAPH ?g {
      ?s ?p <${resourceUri}> .
      OPTIONAL {
        GRAPH ?spl_g {
          ?s ?s_p_label ?s_label .
          FILTER (?s_p_label IN (
            skos:prefLabel,
            dcterms:title,
            foaf:name,
            rdfs:label
          ))
        }
      }
    }
    FILTER (!isBlank(?s))
  }
}
`
const C = ({ resourceUri }) => {
  resourceUri = decodeURIComponent(resourceUri)

  const [
    outcomingIdentityPredicatesResults,
    setOutcomingIdentityPredicatesResults,
  ] = useState({})
  const [outcomingPredicatesResults, setOutcomingPredicatesResults] = useState(
    {},
  )
  const [incomingPredicatesResults, setIncomingPredicatesResults] = useState({})

  useEffect(() => {
    sparqlEndpoint(outcomingPredicatesQuery(resourceUri)).then(
      outcomingPredicatesRes => {
        let { i, s } = separateSparqlResults(
          outcomingPredicatesRes.results.bindings,
        )
        i = restructureSparqlResults(i, 'o')
        setOutcomingIdentityPredicatesResults(i)
        s = restructureSparqlResults(s, 'o')
        setOutcomingPredicatesResults(s)
      },
    )
    sparqlEndpoint(incomingPredicatesQuery(resourceUri)).then(
      incomingPredicatesRes => {
        const _ = restructureSparqlResults(
          incomingPredicatesRes.results.bindings,
          's',
        )
        setIncomingPredicatesResults(_)
      },
    )
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
        outcomingIdentityPredicatesResults,
        'o',
      )}
      <section>
        <header>
          <h2>Visualisations disponibles</h2>
        </header>
        <div style={{ textAlign: 'center' }}>
          {Object.keys(outcomingPredicatesResults).length > 0 &&
            Selector(resourceUri, outcomingPredicatesResults)}
        </div>
      </section>
      {formatSection(
        'Triplets dont la ressource est sujet',
        'prédicat',
        'objet',
        'graphe',
        outcomingPredicatesResults,
        'o',
      )}
      {formatSection(
        'Triplets dont la ressource est objet',
        'prédicat',
        'sujet',
        'graphe',
        incomingPredicatesResults,
        's',
      )}
    </div>
  )
}

export default C

////////////////////////////////////////////////////////////////////////////////
//
// HELPERS
//
////////////////////////////////////////////////////////////////////////////////

function formatSection(title, col1, col2, col3, results, key) {
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
        <tbody>{formatResults(results, key)}</tbody>
      </table>
    </section>
  )
}

function formatResults(results, key) {
  let i = 0
  return Object.entries(results).map(([p, data]) =>
    Object.entries(data).map(([k, bindings]) => {
      switch (bindings[0][key].type) {
        case 'literal':
          return (
            <tr key={i++}>
              <td>{formatBinding(bindings[0].p)}</td>
              <td>{formatBinding(bindings[0][key])}</td>
              <td>{formatBinding(bindings[0].g)}</td>
            </tr>
          )
        case 'uri':
          if (bindings.length === 1) {
            return (
              <tr key={i++}>
                <td>{formatBinding(bindings[0].p)}</td>
                <td>
                  <div>{formatBinding(bindings[0][key])}</div>
                  {bindings[0].hasOwnProperty(key + '_label') && (
                    <div className='labels'>
                      {formatBinding(bindings[0][key + '_label'])}
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
                  <div>{formatBinding(bindings[0][key])}</div>
                  <div className='labels'>
                    {bindings
                      .map(_ => (
                        <span key={i++}>
                          {formatBinding(_[key + '_label'])}
                        </span>
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
