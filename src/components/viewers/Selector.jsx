import React from 'react'
import { Link } from 'react-router-dom'
import { DCTERMS_BASE } from '../../common/rdf'
// import Mei from './Mei'

export function Selector(results) {
  if (results.hasOwnProperty(DCTERMS_BASE + 'format')) {
    if (
      Object.keys(results[DCTERMS_BASE + 'format']).includes(
        'application/vnd.mei+xml',
      )
    )
      return (
        <Link
          to={`/mei?mei_uri=${'https://raw.githubusercontent.com/music-encoding/sample-encodings/master/MEI_4.0/Music/Complete_examples/Beethoven_op.18.mei'}`}>
          🎼 Annotation de partition
        </Link>
      )
  }
}
