const Q = resourceUri => `
SELECT *
WHERE {
  {
    SELECT ?p (COUNT( ?p) as ?c) ("o" as ?direction) WHERE {
    BIND(<${resourceUri}> as ?_id)
        {
          GRAPH ?_g1 {
            ?_id ?p ?_o .
          }
        }
    }
      GROUP BY ?p
  } 
  UNION
  {
    SELECT ?p (COUNT( ?p) as ?c) ("i" as ?direction) WHERE {
    BIND(<${resourceUri}> as ?_id)
        {
          GRAPH ?_g1 {
            ?_s ?p ?_id .
          }
        }
    }
      GROUP BY ?p
  }
}`

export default Q