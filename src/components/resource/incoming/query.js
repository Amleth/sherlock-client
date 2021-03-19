const Q = resourceUri => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
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
    FILTER (?p NOT IN (crm:P140_assigned_attribute_to))
  }
}
`

export default Q