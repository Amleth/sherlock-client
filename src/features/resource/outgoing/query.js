import { makeIdentityQueryFragment } from '../../../common/rdf'

const Q = iri => makeIdentityQueryFragment(iri, true, null, true, false)

export default Q