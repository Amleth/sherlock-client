import {useEffect, useState} from "react";
import {makeIdentityQueryFragment} from "./common/rdf";
import {sparqlEndpoint} from "./common/sparql";

const C = () => {
  const [response, setResponse] = useState();
  useEffect(() => {
    sparqlEndpoint(makeIdentityQueryFragment(
      "http://data-iremus.huma-num.fr/id/00012c9b-7527-4e82-901f-8ef1dac19180",
      true,
      null,
      true,
      true)).then(response => {
      setResponse(response.results.bindings)
    })
  }, [])

  return <pre>{JSON.stringify(response, null, 2)}</pre>
}

export default C;