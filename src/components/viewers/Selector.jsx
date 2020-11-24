import React from 'react'
import { DCTERMS_BASE } from '../../common/rdf'
import Mei from './Mei'

export function Selector(results) {
  if (results.hasOwnProperty(DCTERMS_BASE + 'format')) {
    if (
      Object.keys(results[DCTERMS_BASE + 'format']).includes(
        'application/vnd.mei+xml',
      )
    )
      return <Mei />
  }
}

// https://github.com/lpugin/verovio-react/blob/master/src/App.js
