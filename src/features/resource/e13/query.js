const Q = (resourceUri) => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
SELECT *
WHERE {
  {
    BIND (<${resourceUri}> AS ?id)
    GRAPH ?g {
      ?s crm:P140_assigned_attribute_to ?id .
      ?s rdf:type crm:E13_Attribute_Assignment .
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
          ))
        }
      }
    }
  }
  UNION
  {
    GRAPH ?g {
      ?s crm:P141_assigned ?id .
      ?s rdf:type crm:E13_Attribute_Assignment .
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
          ))
        }
      }
    }
  }
}
`

export default Q
