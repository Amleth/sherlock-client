/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { jsx } from '@emotion/core'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  LABEL_PREDICATES,
  RDF_BASE,
  sortPO,
  sortPS,
  sortLocStrings,
  BIBO_BASE
} from '../../model/common'
import { formatGraphName, hex, makeString } from '../common'
import { APP_MARGIN, h1, h2, MONO_FONT } from '../style'

const labels = {
  marginLeft: '1em'
}

export default () => {
  const { id } = useParams()
  const [graph, setGraph] = useState('')
  const [data, setData] = useState([])
  const [atad, setAtad] = useState([])

  const findGraph = (triples) => {
    setGraph(triples[0].g)
    return triples
  }

  const restructureTriples = (triples) =>
    _(triples)
      .sort(sortPO)
      .groupBy('p')
      .mapValues((arr) => _.groupBy(arr, 'o'))
      .value()

  const restructureSelpirt = (triples) =>
    _(triples)
      .sort(sortPS)
      .groupBy('p')
      .mapValues((arr) => _.groupBy(arr, 's'))
      .value()

  useEffect(() => {
    const u = process.env.REACT_APP_SHERLOCK_SERVICE_BASE_URL + 'id/' + id
    fetch(u)
      .then((res) => res.json())
      .then((res) =>
        res.filter((_) => _.p !== BIBO_BASE + 'authorList' && _.p !== RDF_BASE + 'first')
      )
      .then(findGraph)
      .then(restructureTriples)
      .then(setData)
  }, [id])

  useEffect(() => {
    const u = process.env.REACT_APP_SHERLOCK_SERVICE_BASE_URL + 'di/' + id
    fetch(u)
      .then((res) => res.json())
      .then((res) =>
        res.filter((_) => _.p !== BIBO_BASE + 'authorList' && _.p !== RDF_BASE + 'first')
      )
      .then(restructureSelpirt)
      .then(setAtad)
  }, [id])

  // loop state
  let i = 0

  const labels_triples = _.pickBy(data, (v, p) => LABEL_PREDICATES.includes(p))

  return (
    <>
      {makeTitle(id, graph)}
      <div css={{ margin: APP_MARGIN }}>
        <h2 css={h2}>Identité</h2>
        <table className='resource' css={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Prédicat</th>
              <th>Objet</th>
            </tr>
          </thead>
          <tbody>
            {data.hasOwnProperty(RDF_BASE + 'type') && (
              <tr>
                <td>{makeString(RDF_BASE + 'type')}</td>
                <td>
                  {data.hasOwnProperty(RDF_BASE + 'type') &&
                    Object.values(data[RDF_BASE + 'type']).map((_) => (
                      <div key={_[0].o}>{makeString(_[0].o)}</div>
                    ))}
                </td>
              </tr>
            )}
            {labels_triples &&
              Object.entries(labels_triples).map(([p, v]) => (
                <tr key={p}>
                  <td>{makeString(p)}</td>
                  <td>
                    {Object.keys(v)
                      .sort(sortLocStrings)
                      .map((k) => <span key={k}>{makeString(k)}</span>)
                      .reduce((prev, curr) => [prev, <br key={curr} />, curr])}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h2 css={h2}>Triplets dont la ressource est sujet</h2>
        {makeSection('Objet', 'o', data, makeString, i)}
        <h2 css={h2}>Triplets dont la ressource est objet</h2>
        {Object.keys(atad).length === 0
          ? ''
          : makeSection('Sujet', 's', atad, (p) => <>est&nbsp;{makeString(p)}&nbsp;de</>, i)}
      </div>
    </>
  )
}

const makeTitle = (id, graph) => (
  <h1 css={{ ...h1 }}>
    <div>Ressource</div>
    <div css={{ fontSize: '50%' }}>
      <br />
      <div css={{ color: 'lightgray' }}>UUID SHERLOCK</div>
      <div css={{ fontFamily: MONO_FONT }}>
        {makeString(process.env.REACT_APP_SHERLOCK_DATA_BASE_URL + id)}
      </div>
      <br />
      <div css={{ color: 'lightgray' }}>GRAPH</div>
      <div>{formatGraphName(graph)}</div>
    </div>
    {hex}
  </h1>
)

const makeSection = (title, o_or_s, data, fLeft, i) => (
  <table className='resource'>
    <thead>
      <tr>
        <th>Prédicat</th>
        <th>{title}</th>
      </tr>
    </thead>
    <tbody>
      {Object.entries(data).map(([p, value]) => {
        return (
          <React.Fragment key={p}>
            {Object.entries(value).map(([value, t_labels]) => (
              <tr key={i++}>
                <td css={{ wordBreak: 'keep-all' }}>{fLeft(p)}</td>
                <td>
                  <div>{makeString(value)}</div>
                  <div css={labels}>
                    {t_labels
                      .map((t) => t[o_or_s + '_label'])
                      .sort(sortLocStrings)
                      .map(makeString)
                      .reduce((prev, curr) => [
                        prev,
                        <span css={{ color: 'lightgray' }} key={curr}>
                          &nbsp;/{' '}
                        </span>,
                        curr
                      ])}
                  </div>
                </td>
              </tr>
            ))}
          </React.Fragment>
        )
      })}
    </tbody>
  </table>
)
