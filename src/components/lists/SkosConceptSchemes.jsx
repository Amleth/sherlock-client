import { css, cx } from '@emotion/css'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import { SERVICE_BASE_URI } from '../../sherlock'
import { formatGraphName, formatInt, formatString } from '../common'
import { APP_MARGIN, h1, h2, hex } from '../style'

const SkosConceptSchemes = () => {
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
    fetch(SERVICE_BASE_URI() + 'skos/conceptschemes')
      .then((res) => res.json())
      .then(restructureTriples)
      .then(setData)
  }, [])

  return (
    <div>
      <h1 className={cx(h1, css`text-transform: uppercase;`)}>
        skos:ConceptSchemes
        {hex}
      </h1>
      {Object.entries(data).map(([graph, s]) => (
        <div key={graph} className={css`margin: ${APP_MARGIN}px;`}>
          <h2 className={cx(h2)}>
            <span className={css`color: lightgray;`}>GRAPH</span>{' '}
            <span className={css`color: dimgray;`}>{formatGraphName(graph)}</span>
          </h2>
          {Object.entries(s).map(([k, v]) => (
            <table
              key={k}
              className={cx('resource', css`
                margin-bottom: ${APP_MARGIN}px;
                transition: box-shadow 0.5s;
                &:hover {
                  box-shadow: 1px 1px 3px 1px rgba(0,0,0,0.333);
                  transition: box-shadow 0.1s;
                }
              `)}
            >
              <tbody>
                <tr>
                  <td>uuid sherlock</td>
                  <td>{formatString(k)}</td>
                </tr>
                {v.map((t) => (
                  <tr key={t.p}>
                    <td>{formatString(t.p)}</td>
                    <td>{formatString(t.o)}</td>
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

export default SkosConceptSchemes