import lodash from 'lodash'
import React from 'react'
import {
  DATA_IREMUS_BASE,
  IREMUS_RESOURCE_BASE,
  RDF_PREFIXES,
  RESOURCE_IDENTITY_PREDICATES,
} from '../../common/rdf'

const APP_BASE_URI =
  window.location.protocol +
  '//' +
  window.location.hostname +
  ':' +
  window.location.port +
  '/' +
  process.env.REACT_APP_BASENAME +
  '/'

////////////////////////////////////////////////////////////////////////////////
//
// FORMATING
//
////////////////////////////////////////////////////////////////////////////////

export const formatBinding = b => {
  if (b.type === 'uri') {
    let label = b.value
    for (const prefix in RDF_PREFIXES) {
      if (b.value.startsWith(prefix)) {
        label =
          (RDF_PREFIXES[prefix] ? RDF_PREFIXES[prefix] + ':' : '') +
          b.value.substr(prefix.length)
        break
      }
    }
    let href = b.value
    if (href.startsWith(DATA_IREMUS_BASE))
      href = href.replace(DATA_IREMUS_BASE, APP_BASE_URI)
    return b.value.startsWith(IREMUS_RESOURCE_BASE) ? (
      <a href={href}>{label}</a>
    ) : (
      <a href={href} target='_blank' rel='noreferrer'>
        {label}
      </a>
    )
  } else {
    return (
      <React.Fragment>
        <span className='textValue'>{b.value}</span>
        {b.hasOwnProperty('xml:lang') && (
          <span className='xml-lang'>@{b['xml:lang']}</span>
        )}
      </React.Fragment>
    )
  }
}

////////////////////////////////////////////////////////////////////////////////
//
// RESTRUCTURING BINDINGS
//
////////////////////////////////////////////////////////////////////////////////

/**
 * Separate SPARQL results in two lists:
 *   - results which denote the identity of the resource
 *   - results of which the resource is subject
 */
export function separateSparqlResults(bindings) {
  const i = []
  const s = []

  for (const b of bindings)
    RESOURCE_IDENTITY_PREDICATES.includes(b.p.value) ? i.push(b) : s.push(b)

  return { i, s }
}

/**
 * Restructure SPARQL bindings by sorting & grouping them.
 */
export function restructureSparqlResults(results) {
  // sort bindings by p.value, object lang, o_label, o.value
  const sortFn = (b1, b2) => {
    const predicateCompare = b1.p.value.localeCompare(b2.p.value)
    if (predicateCompare !== 0) return predicateCompare

    if (b1.o['xml:lang'] && b2.o['xml:lang'])
      return b1.o['xml:lang'].localeCompare(b2.o['xml:lang'])

    const oCompare = b1.o.value.localeCompare(b2.o.value)
    if (oCompare !== 0) return oCompare

    if (
      b1.hasOwnProperty('o_label') &&
      b1.o_label['xml:lang'] &&
      b2.hasOwnProperty('o_label') &&
      b2.o_label['xml:lang']
    )
      return b1.o_label['xml:lang'].localeCompare(b2.o_label['xml:lang'])

    if (b1.hasOwnProperty('o_label') && b2.hasOwnProperty('o_label'))
      return b1.o_label.value.localeCompare(b2.o_label.value)
    if (b1.hasOwnProperty('o_label') && !b2.hasOwnProperty('o_label')) return -1
    if (!b1.hasOwnProperty('o_label') && b2.hasOwnProperty('o_label')) return 1
  }

  return lodash(results)
    .sort(sortFn)
    .groupBy('p.value')
    .mapValues(b => lodash.groupBy(b, 'o.value'))
    .value()
}

/**
 * Compare 2 SPARQL results according to three bindings.
 */
// export function compareResults(r1, r2, p1, p2, p3) {
//   const p1_compare = r1[p1].localeCompare(r2[p1])
//   if (p1_compare !== 0) return p1_compare

//   if (r1[p2] && r2[p2]) return r1[p2].localeCompare(r2[p2])
//   if (r1[p2] && !r2[p2]) return -1
//   if (!r1[p2] && r2[p2]) return 1

//   return r1[p3].localeCompare(r2[p3])
// }
