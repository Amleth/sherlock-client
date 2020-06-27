import { LANGS_ORDER } from '../view/constants'

export const BIBO_BASE = 'http://purl.org/ontology/bibo/'
export const DC_BASE = 'http://purl.org/dc/elements/1.1/'
export const DCTERMS_BASE = 'http://purl.org/dc/terms/'
export const FOAF_BASE = 'http://xmlns.com/foaf/0.1/'
export const HEMEF_BASE = 'http://data-iremus.huma-num.fr/ns/hemef#'
export const MUSRAD30_BASE = 'http://data-iremus.huma-num.fr/ns/musrad30#'
export const RDF_BASE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
export const RDFS_BASE = 'http://www.w3.org/2000/01/rdf-schema#'
export const SCHEMAORG_BASE = 'http://schema.org/'
export const SKOS_BASE = 'http://www.w3.org/2004/02/skos/core#'

export const RDF_PREFIXES = {
  'http://www.cidoc-crm.org/cidoc-crm/': 'crm',
  [BIBO_BASE]: 'bibo',
  [DC_BASE]: 'dc',
  [DCTERMS_BASE]: 'dcterms',
  [FOAF_BASE]: 'foaf',
  [HEMEF_BASE]: 'hemef',
  [MUSRAD30_BASE]: 'musrad30',
  [RDF_BASE]: 'rdf',
  [RDFS_BASE]: 'rdfs',
  [SCHEMAORG_BASE]: 'schema',
  [SKOS_BASE]: 'skos',
  [process.env.REACT_APP_SHERLOCK_DATA_BASE_URL]: 'iremus'
}

export const LABEL_PREDICATES = [
  DC_BASE + 'title',
  DCTERMS_BASE + 'title',
  FOAF_BASE + 'familyName',
  FOAF_BASE + 'firstName',
  FOAF_BASE + 'givenName',
  FOAF_BASE + 'name',
  RDFS_BASE + 'label',
  SKOS_BASE + 'prefLabel'
]

export const sortPO = (t1, t2) => {
  const p_compare = t1.p.localeCompare(t2.p)
  if (p_compare !== 0) return p_compare

  if (t1.o_label && t2.o_label) return t1.o_label.localeCompare(t2.o_label)
  if (t1.o_label && !t2.o_label) return -1
  if (!t1.o_label && t2.o_label) return 1

  return t1.o.localeCompare(t2.o)
}

export const sortPS = (t1, t2) => {
  const p_compare = t1.p.localeCompare(t2.p)
  if (p_compare !== 0) return p_compare

  if (t1.s_label && t2.s_label) return t1.s_label.localeCompare(t2.s_label)
  if (t1.s_label && !t2.s_label) return -1
  if (!t1.s_label && t2.s_label) return 1

  return t1.s.localeCompare(t2.s)
}

const isLocString = (s) => {
  if (s && s.includes('@')) {
    const _ = s.split('@').slice(-1)[0]
    if (LANGS_ORDER.includes(_)) {
      return LANGS_ORDER.indexOf(_) + ''
    }
  }
  return false
}

export const sortLocStrings = (a, b) => {
  if (!a && !b) return 0
  if (a && !b) return -1
  if (!a && b) return 1
  let res
  const a_ = isLocString(a)
  const b_ = isLocString(b)
  if (!a_ && !b_) res = a.localeCompare(b)
  else if (!a_ && b_) res = -1
  else if (a_ && !b_) res = 1
  else res = a_.localeCompare(b_)
  return res
}
