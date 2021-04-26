export const Q = resourceUri => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT ?c ?p ?o
WHERE {
  BIND(<${resourceUri}> as ?id)
  {
    GRAPH ?g {
	    ?id ?p ?o .
        FILTER (?p IN (
          dcterms:title,
          foaf:name,
          skos:prefLabel,
          rdf:type,
          rdfs:label,
          crm:P1_is_identified_by,
          crm:P102_has_title
        ))
    }
  }
  UNION
  {
    SELECT (COUNT(?_o) + COUNT(?_s) AS ?c)
    WHERE {
      BIND(<${resourceUri}> as ?_id)
      {
        GRAPH ?_g1 {
          ?_id ?outgoing_predicate ?_o .
        }
      }
      UNION
      {
        GRAPH ?_g2 {
          ?_s ?incoming_predicate ?_id .
        }
      }
    }
  }
}`

export const getIdentities = resourceUriTab => `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT ?c ?p ?o ?id ?id
WHERE {
  {
    SELECT ?c ?p ?o (?id_identity AS ?id) {
        GRAPH ?g {
            ?id_identity ?p ?o .
            FILTER (?p IN (
              dcterms:title,
              foaf:name,
              skos:prefLabel,
              rdf:type,
              rdfs:label,
              crm:P1_is_identified_by,
              crm:P102_has_title
            )) .
            FILTER (?id_identity IN (
              ${resourceUriTabAsString(resourceUriTab)}
            ))
        }
    }
  }
  UNION
  {
    SELECT (COUNT(?_o) + COUNT(?_s) AS ?c) (?id_count AS ?id)
    WHERE {
      {
        GRAPH ?_g1 {
          ?id_count ?outgoing_predicate ?_o .
        }
      }
      UNION
      {
        GRAPH ?_g2 {
          ?_s ?incoming_predicate ?id_count .
        }
      }
      FILTER (?id_count IN (
          ${resourceUriTabAsString(resourceUriTab)}
      ))
    }
    group by ?id_count
  }
}`

function resourceUriTabAsString(resourceUriTab) {
    return resourceUriTab.map( resource => {
        return `<${resource.r.value}>`;
    }).join(",");
}
