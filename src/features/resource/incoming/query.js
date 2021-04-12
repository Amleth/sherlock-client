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
    BIND (<${resourceUri}> as ID)
    GRAPH ?g {
      ?s ?p ?id .
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
      OPTIONAL {
        GRAPH ?s_e41_g {
          ?s crm:P1_is_identified_by ?e41 .
          ?e41 rdf:type ?e41_type .
          FILTER (?e41_type IN (crm:E41_Appellation, crm:E42_Identifier))
          ?e41 rdfs:label ?s_label .
        }
      }
    }
    FILTER (!isBlank(?s))
    FILTER (?p NOT IN (crm:P140_assigned_attribute_to))
  }
}
`

export default Q