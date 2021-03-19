/** @jsxImportSource @emotion/react */
import { Fragment, useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { sparqlEndpoint } from '../../../common/sparql'
import Q from './query'
import { formatEntityBindings, makeCode } from '../helpers_view'
import { restructureSparqlE13Results } from './../helpers_rdf'
import { getCode, RDF_BASE } from '../../../common/rdf'

const C = ({ resourceUri }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    sparqlEndpoint(Q(resourceUri)).then((outcomingE13Res) => {
      const _ = restructureSparqlE13Results(outcomingE13Res.results.bindings)
      setData(_)
    })
  }, [resourceUri])

  return (
    <>
      {Object.entries(data).map(([uri, e13]) => {
        const type = e13[RDF_BASE + 'type'][0].o.value
        const clone = Object.assign({}, e13)
        delete clone[RDF_BASE + 'type']
        return (
          <div
            css={css`
              display: flex;
            `}
            key={uri}
          >
            {makeCode(getCode(type), 40)}
            <div
              css={css`
                border-bottom: none;
                border-left: 2px solid #ddd;
                border-right: 1px solid #333;
                border-top: none;
                margin-left: 10px;
                margin-bottom: 30px;
                width: 100%;
              `}
            >
              <table>
                <tbody>{formatEntityBindings(clone, 'o')}</tbody>
              </table>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default C
