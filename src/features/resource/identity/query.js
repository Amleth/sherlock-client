// http://localhost:3000/sherlock/id/c03eb5af-ba10-44df-92eb-32b5360af09f
const Q = resourceUri => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT *
WHERE {
  BIND(<${resourceUri}> AS ?s)
  GRAPH ?g {
    ?s ?p ?o .
    FILTER (?p IN (
      dcterms:title,
      foaf:name,
      skos:prefLabel,
      rdf:type,
      rdfs:label,
      crm:P1_is_identified_by,
      crm:P102_has_title
    ) 
  }
}
`

export default Q