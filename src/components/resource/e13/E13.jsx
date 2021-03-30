/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { sparqlEndpoint } from '../../../common/sparql'
import Q from './query'
import { formatEntityBindings } from '../helpers_view'
import { restructureSparqlE13Results } from './../helpers_rdf'
import { CRM_BASE, DCTERMS_BASE, RDF_BASE } from '../../../common/rdf'
import { h2 } from '../Resource.css'
import { MONO_FONT } from '../../../style'

const BORDER_COLOR = '#0dd'

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
      <h2 css={h2}>Annotations</h2>
      <br />
      {Object.entries(data).map(([uri, e13]) => {
        // const type = e13[RDF_BASE + 'type'][0].o.value
        const created = new Date(e13[DCTERMS_BASE + 'created'][0].o.value)
        // const creatorUUID = e13[CRM_BASE + 'P14_carried_out_by'][0].o
        const creatorLabel = e13[CRM_BASE + 'P14_carried_out_by'][0].o_label
        const clone = Object.assign({}, e13)
        delete clone[CRM_BASE + 'P14_carried_out_by']
        delete clone[DCTERMS_BASE + 'created']
        delete clone[RDF_BASE + 'type']
        return (
          <section
            css={css`
              border-left: 1px solid ${BORDER_COLOR};
              border-right: 1px solid ${BORDER_COLOR};
              border-top: 1px solid ${BORDER_COLOR};
              border-bottom: 1px solid ${BORDER_COLOR};
              margin: 0 0 20px 0 !important;
            `}
            key={uri}
          >
            <header
              css={css`
                background-color: #011;
                color: #aaa;
                font-family: ${MONO_FONT};
                letter-spacing: -2px;
                padding: 0 5px;
              `}
            >
              <span
                css={css`
                  float: left;
                `}
              >
                E13
              </span>
              <span
                css={css`
                  float: right;
                `}
              >
                <span>{creatorLabel.value}</span>
                <span
                  css={css`
                    // font-style: italic;
                  `}
                >
                  &nbsp;⬢&nbsp;
                  {created.toLocaleDateString()} {created.toLocaleTimeString()}
                </span>
              </span>
            </header>
            <main
              css={css`
                td:nth-of-type(1) {
                  padding-left: 5px;
                }
              `}
            >
              <table>
                <tbody>{formatEntityBindings(clone, 'o', false)}</tbody>
              </table>
            </main>
          </section>
        )
      })}
    </>
  )
}

export default C
