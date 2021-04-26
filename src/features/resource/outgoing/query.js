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
    OPTIONAL {
      GRAPH ?opl_g {
        ?o ?o_p_label ?o_label .
        FILTER (?o_p_label IN (
          dcterms:title,
          foaf:name,
          skos:prefLabel,
          rdfs:label,
          crm:P1_is_identified_by
        ) && isLiteral(?o_label))
      }
    }
    OPTIONAL {
      GRAPH ?o_e41_g {
        ?o crm:P1_is_identified_by ?e41 .
        ?e41 rdf:type ?e41_type .
        FILTER (?e41_type IN (crm:E41_Appellation, crm:E42_Identifier))
        ?e41 rdfs:label ?o_label .
      }
    }
  }
  FILTER (!isBlank(?o))
}
`

export default Q