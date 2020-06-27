/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { jsx } from '@emotion/core'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { formatGraphName, formatInt, hex, makeString } from '../common'
import { APP_MARGIN, h1, h2 } from '../style'

export default () => {
  const [data, setData] = useState([])

  const restructureTriples = (triples) =>
    _(triples)
      .orderBy(['g'])
      .groupBy('g')
      .mapValues((o) =>
        _(o)
          .orderBy(['s'])
          .groupBy('s')
          .mapValues((oo) => _.orderBy(oo, ['p', 'o']))
          .value()
      )
      .value()

  useEffect(() => {
    const u = process.env.REACT_APP_SHERLOCK_SERVICE_BASE_URL + 'skos/conceptschemes'
    fetch(u)
      .then((res) => res.json())
      .then(restructureTriples)
      .then(setData)
  }, [])

  return (
    <div>
      <h1 css={h1}>
        skos:ConceptSchemes
        {hex}
      </h1>
      {Object.entries(data).map(([graph, s]) => (
        <div key={graph} css={{ margin: APP_MARGIN }}>
          <h2 css={h2}>
            <span css={{ color: 'lightgray' }}>GRAPH</span>{' '}
            <span css={{ color: 'dimgray' }}>{formatGraphName(graph)}</span>
          </h2>
          {Object.entries(s).map(([k, v]) => (
            <table
              key={k}
              className='resource'
              css={{
                marginBottom: APP_MARGIN,
                transition: `box-shadow 0.5s`,
                '&:hover': {
                  boxShadow: '1px 1px 3px 1px rgba(0,0,0,0.333)',
                  transition: `box-shadow 0.1s`
                }
              }}
            >
              <tbody>
                <tr>
                  <td>uuid sherlock</td>
                  <td>{makeString(k)}</td>
                </tr>
                {v.map((t) => (
                  <tr key={t.p}>
                    <td>{makeString(t.p)}</td>
                    <td>{makeString(t.o)}</td>
                  </tr>
                ))}
                <tr>
                  <td>#&nbsp;top&nbsp;concepts</td>
                  <td>{formatInt(v[0].ntc)}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      ))}
    </div>
  )
}
