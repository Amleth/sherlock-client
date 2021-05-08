export const getSherlockIriFromMeiUri = mei_uri => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?s
WHERE {
  GRAPH ?g {
    BIND("${mei_uri}" AS ?mei_uri)
    ?E42 rdfs:label ?mei_uri .
    ?s crm:P1_is_identified_by ?E42 .
  }
}
`