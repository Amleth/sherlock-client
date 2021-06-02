const Q = iri => `
SELECT *
WHERE {
  BIND(<${iri}> AS ?s)
  GRAPH ?g {
    ?s ?p ?o .
  }
}
`

export default Q