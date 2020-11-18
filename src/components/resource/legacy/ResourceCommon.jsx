import { css, cx } from '@emotion/css'
import _ from 'lodash'
import LabelIcon from '@material-ui/icons/Label'
import React, { useEffect, useState } from 'react'

import { formatGraphName, formatString } from '../common'
import {
  BIBO_BASE,
  LABEL_PREDICATES,
  RDF_BASE,
  sortLocStrings,
  sortT3p,
} from '../../model/common'
import { APP_MARGIN, h1, h2, hex, MONO_FONT } from '../style'

function restructure(resources, sortFn, group, subgroup) {
  return _(resources)
    .sort(sortFn)
    .groupBy(group)
    .mapValues(æ => _.groupBy(æ, subgroup))
    .value()
}

const css_labels = css`
  margin-left: 1em;
`
const css_label_icon = css`
  color: #e8e8e8;
  margin-right: 0.1em;
`

const ResourceCommon = ({ resourceUri, serviceUriId, serviceUriDi }) => {
  const [graphName, setGraphName] = useState('')
  const [labelPredicates, setLabelPredicates] = useState({})
  const [outgoingPredicates, setOutgoingPredicates] = useState({})
  const [
    outgoingPredicatesToBlankNodes,
    setOutgoingPredicatesToBlankNodes,
  ] = useState({})
  const [incomingPredicates, setIncomingPredicates] = useState({})
  const [
    incomingPredicatesFromBlankNodes,
    setIncomingPredicatesFromBlankNodes,
  ] = useState({})

  useEffect(() => {
    fetch(serviceUriId)
      .then(res => res.json())
      .then(res => {
        // 1)
        setGraphName(res[0].g)
        // 2)
        setLabelPredicates(
          restructure(
            res.filter(t => LABEL_PREDICATES.includes(t.p)),
            (t1, t2) => sortT3p(t1, t2, 'p', 'o_label', 'o'),
            'p',
            'o',
          ),
        )
        // 3)
        setOutgoingPredicates(
          restructure(
            res
              .filter(t => !t.obn)
              .filter(
                _ =>
                  _.p !== BIBO_BASE + 'authorList' &&
                  _.p !== RDF_BASE + 'first',
              ),
            (t1, t2) => sortT3p(t1, t2, 'p', 'o_label', 'o'),
            'p',
            'o',
          ),
        )
        // 4)
        setOutgoingPredicatesToBlankNodes(
          _(res.filter(t => t.obn))
            .groupBy('p')
            .mapValues(arr =>
              _(arr)
                .groupBy('obn')
                .mapValues(arr =>
                  _(arr)
                    .groupBy('obn_p')
                    .mapValues(arr => _(arr).groupBy('obn_o').value())
                    .value(),
                )
                .value(),
            )
            .value(),
        )
      })
  }, [serviceUriId])

  useEffect(() => {
    fetch(serviceUriDi)
      .then(res => res.json())
      .then(res =>
        res.filter(
          _ => _.p !== BIBO_BASE + 'authorList' && _.p !== RDF_BASE + 'first',
        ),
      )
      .then(res => {
        // 5)
        setIncomingPredicates(
          restructure(
            res.filter(t => !t.sbn),
            (t1, t2) => sortT3p(t1, t2, 'p', 's_label', 's'),
            'p',
            's',
          ),
        )
        // 6)
        setIncomingPredicatesFromBlankNodes(
          _(res.filter(t => t.sbn))
            .groupBy('sbn')
            .mapValues(arr =>
              _(arr)
                .groupBy('sbn_p')
                .mapValues(arr => _(arr).groupBy('sbn_o').value())
                .value(),
            )
            .value(),
        )
      })
  }, [serviceUriDi])

  return (
    <div
      className={css`
        margin: ${APP_MARGIN}px;
      `}>
      {/* 1 */}
      {makeTitle(resourceUri, graphName)}

      {/* 2 */}
      <h2 className={cx(h2)}>Identité</h2>
      <table
        className={cx(
          'resource',
          css`
            margin-top: 1rem;
          `,
        )}>
        <thead>
          <tr>
            <th>Prédicat</th>
            <th>Objet</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(outgoingPredicates).length > 0 &&
            outgoingPredicates.hasOwnProperty(RDF_BASE + 'type') && (
              <tr>
                <td>{formatString(RDF_BASE + 'type')}</td>
                <td>
                  {outgoingPredicates.hasOwnProperty(RDF_BASE + 'type') &&
                    Object.values(
                      outgoingPredicates[RDF_BASE + 'type'],
                    ).map(_ => <div key={_[0].o}>{formatString(_[0].o)}</div>)}
                </td>
              </tr>
            )}
          {Object.keys(labelPredicates).length > 0 &&
            Object.entries(labelPredicates).map(([p, v]) => (
              <tr key={p}>
                <td>{formatString(p)}</td>
                <td>
                  {Object.keys(v)
                    .sort(sortLocStrings)
                    .map(k => <span key={k}>{formatString(k)}</span>)
                    .reduce((prev, curr) => [prev, <br key={curr} />, curr])}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* 3 */}
      {Object.keys(outgoingPredicates).length !== 0 && (
        <>
          <h2 className={cx(h2)}>Triplets dont la ressource est sujet</h2>
          {makeOutgoindOrIncomingPredicates(
            'Objet',
            'o',
            outgoingPredicates,
            formatString,
            graphName,
          )}
        </>
      )}

      {/* 4 */}
      {Object.keys(outgoingPredicatesToBlankNodes).length !== 0 && (
        <>
          <h2 className={cx(h2)}>Nœuds anonymes pointés par la ressource</h2>
          {makeOutgoingPredicatesToBlankNodes(
            outgoingPredicatesToBlankNodes,
            graphName,
            'obn_o_label',
          )}
        </>
      )}

      {/* 5 */}
      {Object.keys(incomingPredicates).length !== 0 && (
        <>
          <h2 className={cx(h2)}>Triplets dont la ressource est objet</h2>
          {makeOutgoindOrIncomingPredicates(
            'Sujet',
            's',
            incomingPredicates,
            p => (
              <>est&nbsp;{formatString(p)}&nbsp;de</>
            ),
          )}
        </>
      )}

      {/* 6 */}
      {Object.keys(incomingPredicatesFromBlankNodes).length !== 0 && (
        <>
          <h2 className={cx(h2)}>Nœuds anonymes pointant la ressource</h2>
          {makeIncomingPredicatesFromBlankNodes(
            incomingPredicatesFromBlankNodes,
            graphName,
          )}
        </>
      )}
    </div>
  )
}

const makeOutgoindOrIncomingPredicates = (
  title,
  o_or_s,
  resources,
  fLeft,
  graphName,
) => {
  let i = 0
  return (
    <table className='resource'>
      <thead>
        <tr>
          <th>Prédicat</th>
          <th>{title}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(resources).map(([p, resources]) => {
          return (
            <React.Fragment key={p}>
              {Object.entries(resources).map(([value, triples]) => {
                return (
                  <tr key={i++}>
                    <td
                      className={css`
                        word-break: keep-all;
                      `}>
                      {fLeft(p)}
                    </td>
                    <td>
                      <div>
                        {formatString(value)}
                        {triples[0].o_g && triples[0].o_g !== graphName ? (
                          <span
                            className={css`
                              color: lightgray;
                            `}>
                            {' '}
                            (graph&nbsp;: {formatGraphName(triples[0].o_g)})
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className={cx(css_labels)}>
                        {triples.map(t => t[o_or_s + '_label']).filter(_ => _)
                          .length > 0 && (
                          <LabelIcon className={cx(css_label_icon)} />
                        )}
                        {triples
                          .map(t => t[o_or_s + '_label'])
                          .sort(sortLocStrings)
                          .map(formatString)
                          .reduce((prev, curr) => [
                            prev,
                            <span
                              className={css`
                                color: lightgray;
                              `}
                              key={curr}>
                              &nbsp;/{' '}
                            </span>,
                            curr,
                          ])}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

// OUTGOING TO BN :
//     comprend -> 4c72… -> jeu   -> lotfp -> ["…", "…"]
//     p        -> obn   -> obn_p -> obn_o -> [obn_o_label, obn_o_label]

// INCOMING FROM BN :
//     sbn -> sbn_p -> sbn_o -> [sbn_o_label]

const makeOutgoingPredicatesToBlankNodes = (
  v,
  graphName,
  o_or_s_bn_o_label,
) => {
  let i = 0
  return (
    <table className='resource bn'>
      <tbody>
        {Object.entries(v).map(([p, v]) => {
          return Object.entries(v).map(([bn, v]) => {
            return (
              <React.Fragment key={bn}>
                <tr>
                  <td colSpan='2' className='resource'>
                    {formatString(p)} -> […]
                  </td>
                </tr>
                {Object.entries(v).map(([bn_p, v]) => {
                  return Object.entries(v).map(([bn_o, triples]) => {
                    return (
                      <tr key={i++}>
                        <td
                          className={css`
                            padding-left: 1.5em !important;
                            word-break: keep-all;
                          `}>
                          {formatString(bn_p)}
                        </td>
                        <td
                          className={css`
                            word-break: keep-all;
                          `}>
                          {formatString(bn_o)}
                          {triples[0].obn_o_g &&
                          triples[0].obn_o_g !== graphName ? (
                            <span
                              className={css`
                                color: lightgray;
                              `}>
                              {' '}
                              (graph&nbsp;:{' '}
                              {formatGraphName(triples[0].obn_o_g)})
                            </span>
                          ) : (
                            ''
                          )}
                          <div className={cx(css_labels)}>
                            {triples
                              .map(t => t[o_or_s_bn_o_label])
                              .filter(_ => _).length > 0 && (
                              <LabelIcon className={cx(css_label_icon)} />
                            )}
                            {_.uniq(triples.map(t => t[o_or_s_bn_o_label]))
                              .sort(sortLocStrings)
                              .map(formatString)
                              .reduce((prev, curr) => [
                                prev,
                                <span
                                  className={css`
                                    color: lightgray;
                                  `}
                                  key={curr}>
                                  &nbsp;/{' '}
                                </span>,
                                curr,
                              ])}
                          </div>
                        </td>
                      </tr>
                    )
                  })
                })}
              </React.Fragment>
            )
          })
        })}
      </tbody>
    </table>
  )
}

const makeIncomingPredicatesFromBlankNodes = (v, graphName) => {
  return (
    <table className='resource bn'>
      <tbody>
        {Object.entries(v).map(([bn, v]) => {
          return (
            <React.Fragment key={bn}>
              <tr key={bn}>
                <td colSpan='2'>[] -></td>
              </tr>
              {Object.entries(v).map(([p, v]) => {
                return Object.entries(v).map(([o, triples]) => {
                  return (
                    <tr key={p + o}>
                      <td
                        className={css`
                          padding-left: 1.5em !important;
                          word-break: keep-all;
                        `}>
                        {formatString(p)}
                      </td>
                      <td>
                        {formatString(o)}
                        {triples[0].sbn_o_g &&
                        triples[0].sbn_o_g !== graphName ? (
                          <span
                            className={css`
                              color: lightgray;
                            `}>
                            {' '}
                            (graph&nbsp;: {formatGraphName(triples[0].sbn_o_g)})
                          </span>
                        ) : (
                          ''
                        )}
                        <div className={cx(css_labels)}>
                          {triples.map(t => t[t.sbn_o_label]).filter(_ => _)
                            .length > 0 && (
                            <LabelIcon className={cx(css_label_icon)} />
                          )}
                          {_.uniq(triples.map(t => t.sbn_o_label))
                            .sort(sortLocStrings)
                            .map(formatString)
                            .reduce((prev, curr) => [
                              prev,
                              <span
                                className={css`
                                  color: lightgray;
                                `}
                                key={curr}>
                                &nbsp;/{' '}
                              </span>,
                              curr,
                            ])}
                        </div>
                      </td>
                    </tr>
                  )
                })
              })}
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

const makeTitle = (resourceUri, graph) => {
  return (
    <h1 className={cx(h1)}>
      <div
        className={css`
          text-transform: uppercase;
        `}>
        Ressource
      </div>
      <div
        className={css`
          font-size: 50%;
        `}>
        <br />
        <div
          className={css`
            color: lightgray;
          `}>
          IDENTIFIANT SHERLOCK
        </div>
        <div
          className={css`
            font-family: ${MONO_FONT};
            letter-spacing: 0;
          `}>
          {formatString(resourceUri)}
        </div>
        <br />
        <div
          className={css`
            color: lightgray;
          `}>
          GRAPH
        </div>
        <div>{formatGraphName(graph)}</div>
      </div>
      {hex}
    </h1>
  )
}

export default ResourceCommon
