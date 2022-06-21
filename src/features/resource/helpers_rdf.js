import lodash from 'lodash'
import {
  CRM_BASE,
  RESOURCE_IDENTITY_PREDICATES,
} from '../../common/rdf'

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

export function separateOutgoingE13Results(bindings) {
  const s = []
  const e13 = []

  for (const b of bindings)
    b.p.value === (CRM_BASE + 'P140_assigned_attribute_to') ? e13.push(b) : s.push(b)

  return { s, e13 }
}

export function restructureSparqlResults(bindings) {

  const sortFn = (b1, b2) => {
    const predicateCompare = b1.l_p.value.localeCompare(b2.l_p.value)
    return predicateCompare

    // if (predicateCompare !== 0) return predicateCompare
    // sort bindings by p.value, object lang, <key>_label, key.value
    // if (b1[key]['xml:lang'] && b2[key]['xml:lang'])
    //   return b1[key]['xml:lang'].localeCompare(b2[key]['xml:lang'])

    // const keyCompare = b1[key].value.localeCompare(b2[key].value)
    // if (keyCompare !== 0) return keyCompare

    // if (
    //   b1.hasOwnProperty(key + '_label') &&
    //   b1[key + '_label']['xml:lang'] &&
    //   b2.hasOwnProperty(key + '_label') &&
    //   b2[key + '_label']['xml:lang']
    // )
    //   return b1[key + '_label']['xml:lang'].localeCompare(
    //     b2[key + '_label']['xml:lang'],
    //   )

    // if (b1.hasOwnProperty(key + '_label') && b2.hasOwnProperty(key + '_label'))
    //   return b1[key + '_label'].value.localeCompare(b2[key + '_label'].value)
    // if (b1.hasOwnProperty(key + '_label') && !b2.hasOwnProperty(key + '_label'))
    //   return -1
    // if (!b1.hasOwnProperty(key + '_label') && b2.hasOwnProperty(key + '_label'))
    //   return 1
    // }

    // return lodash(results)
    //   .sort(sortFn)
    //   .groupBy('id_p.value')
    //   .mapValues(b => lodash.groupBy(b, 'id_r.value'))
    //   .value()
  }

  bindings = bindings.sort(sortFn)

  let res = {}

  for (const b of bindings) {
    const l_p_l_r_key = b.l_p.value + b.l_r.value
    if (!res[l_p_l_r_key]) res[l_p_l_r_key] = []
    res[l_p_l_r_key][res[l_p_l_r_key].length] = b
  }

  return res
}

export function restructureSparqlE13Results(results) {
  return lodash(results)
    .groupBy('s.value')
    .mapValues(b => lodash.groupBy(b, 'p.value'))
    .value()
}

export const getIdentity = data => Object.fromEntries(
  Object.entries(data).filter(([k, v]) => RESOURCE_IDENTITY_PREDICATES.includes(k))
)

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
