import { SERVICE_BASE_URI } from '../sherlock'

export const PREFIXES = `
PREFIX : <http://data-iremus.huma-num.fr/id/>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX hemef: <http://data-iremus.huma-num.fr/ns/hemef#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX schema: <http://schema.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
`

export const makeBody = query => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
  mode: 'cors',
  cache: 'no-cache',
  redirect: 'follow',
  body: `query=${encodeURIComponent(query)}`
})

export const sparqlEndpointBody = query => ({
  ...makeBody(query),
  url: process.env.REACT_APP_SHEROCK_SPARQL_ENDPOINT
})

export const sparqlEndpoint = async query => {
  let res = await fetch(process.env.REACT_APP_SHEROCK_SPARQL_ENDPOINT, makeBody(query))
  res = await res.json()
  return res
}