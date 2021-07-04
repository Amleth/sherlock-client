import { makeIdentityQueryFragment } from '../../../common/rdf'

const Q = iri => makeIdentityQueryFragment(iri, true, null, false, false)

export default Q