export const resourcesByPredicateAndSubjectQuery = (p, resourceUri)  => `
SELECT *
WHERE {
  {
    BIND(<${resourceUri}> as ?id)
    {
      GRAPH ?_g1 {
        ?id <${p}> ?r .
      }
    }
  }
}`

export const resourcesByPredicateAndObjectQuery = (p, resourceUri)  => `
SELECT *
WHERE {
  {
    BIND(<${resourceUri}> as ?id)
    {
      GRAPH ?_g1 {
        ?r <${p}> ?id .
      }
    }
  }
}`
