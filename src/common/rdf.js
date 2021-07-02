//
// RDF PREFIXES
//

export const BIBO_BASE = 'http://purl.org/ontology/bibo/'
export const LRMOO_BASE = 'http://www.cidoc-crm.org/lrmoo/'
export const CRM_BASE = 'http://www.cidoc-crm.org/cidoc-crm/'
export const CRMDIG_BASE = 'http://www.ics.forth.gr/isl/CRMdig/'
export const DC_BASE = 'http://purl.org/dc/elements/1.1/'
export const DCTERMS_BASE = 'http://purl.org/dc/terms/'
export const FOAF_BASE = 'http://xmlns.com/foaf/0.1/'
export const HEMEF_BASE = 'http://data-iremus.huma-num.fr/ns/hemef#'
export const DATA_IREMUS_FILES_BASE = 'http://data-iremus.huma-num.fr/files/'
export const DATA_IREMUS_ID_BASE = 'http://data-iremus.huma-num.fr/id/'
export const IREMUS_RESOURCE_BASE = 'http://data-iremus.huma-num.fr/id/'
export const IREMUS_NS_BASE = 'http://data-iremus.huma-num.fr/ns/'
export const IREMUS_GRAPH_BASE = 'http://data-iremus.huma-num.fr/graph/'
export const MUSRAD30_BASE = 'http://data-iremus.huma-num.fr/ns/musrad30#'
export const OWL_BASE = 'http://www.w3.org/2002/07/owl#'
export const RDF_BASE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
export const RDFS_BASE = 'http://www.w3.org/2000/01/rdf-schema#'
export const SCHEMAORG_BASE = 'http://schema.org/'
export const SKOS_BASE = 'http://www.w3.org/2004/02/skos/core#'

export const RDF_PREFIXES = {
  [CRM_BASE]: 'crm',
  [CRMDIG_BASE]: 'crmdig',
  [BIBO_BASE]: 'bibo',
  [DC_BASE]: 'dc',
  [DCTERMS_BASE]: 'dcterms',
  [FOAF_BASE]: 'foaf',
  [HEMEF_BASE]: 'hemef',
  [IREMUS_RESOURCE_BASE]: '',
  [IREMUS_NS_BASE]: '',
  [MUSRAD30_BASE]: 'musrad30',
  [LRMOO_BASE]: 'lrmoo',
  [OWL_BASE]: 'owl',
  [RDF_BASE]: 'rdf',
  [RDFS_BASE]: 'rdfs',
  [SCHEMAORG_BASE]: 'schema',
  [SKOS_BASE]: 'skos',
  [IREMUS_GRAPH_BASE]: '',
}

export const PRIORITIZED_RDF_PREFIXES = Object.entries(RDF_PREFIXES).sort((a, b) => a[0].length < b[0].length)

export const LABEL_PREDICATES = [
  CRM_BASE + 'P1_is_identified_by',
  DC_BASE + 'title',
  DCTERMS_BASE + 'title',
  FOAF_BASE + 'familyName',
  FOAF_BASE + 'firstName',
  FOAF_BASE + 'givenName',
  FOAF_BASE + 'name',
  RDFS_BASE + 'label',
  SKOS_BASE + 'prefLabel',
]

export const RESOURCE_IDENTITY_PREDICATES = [
  ...LABEL_PREDICATES,
  RDF_BASE + 'type',
  DCTERMS_BASE + 'creator',
  SKOS_BASE + 'inScheme',
  RDFS_BASE + 'subClassOf',
]

//
// LANGS
//

export const COUNTRY_FLAGS = {
  de: '🇩🇪',
  en: '🇬🇧',
  es: '🇪🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
}
export const LANGS_ORDER = ['fr', 'en', 'it', 'de', 'es']

// export const sortLocStrings = (a, b) => {
//   if (!a && !b) return 0
//   if (a && !b) return -1
//   if (!a && b) return 1
//   let res
//   const a_ = isLocString(a)
//   const b_ = isLocString(b)
//   if (!a_ && !b_) res = a.localeCompare(b)
//   else if (!a_ && b_) res = -1
//   else if (a_ && !b_) res = 1
//   else res = a_.localeCompare(b_)
//   return res
// }

export function getCode(uri) {
  if (uri.startsWith(CRM_BASE) || uri.startsWith(CRMDIG_BASE)) {
    return uri.split('/').slice(-1)[0].split('_')[0]
  }
  return null
}

export function formatUri(uri) {
  for (const [key, value] of Object.entries(RDF_PREFIXES)) {
    uri = uri.replace(key, value !== '' ? value + ':' : '')
  }
  return uri
}

export function computeIdentity(identity) {
  const chosenIdentity = identity.find(identity => identity.p && identity.p.value === CRM_BASE + 'P1_is_identified_by')
  return chosenIdentity ? formatUri(chosenIdentity.o.value) : ''
}

export function computeResourceLabel(resourceIri, identity) {
  return `${computeIdentity(identity)}   ${formatUri(resourceIri)}`
}

/*
A resource may have triples that represent its identity (see the white-list of predicates in the query).
Objects of such predicates may be literal (like in "<RESOURCE_1> crm:P1_is_identified_by "Thomas") or linked resources.
In this second case, we also want to get information about the linked resources,
we want to get identity information about identity information of our resource(s).

Let's now explicit graph variables names:

?lr_g
  "linked resources graph"
  the gaph that contains triples that link resources to the main IRI (all resources, not only identity resources)
?ir_g
    "identity resource graph"
    the graph that contains triples that link to identity resources
?ir_ir_g
    "identity resources of identity resources graph"
    the graph that contains triples that link identity resources to their identity resources (label & type)
?l_ir_ir_g
    "labels of identity resources of identity resources graph"
    the graph that contains triples that link labels of identity resources of identity resources

And other variables names:

  ?id_p
    "identity predicate"
    prediate that links to an identity resource
  ?id_r
    "identity resource"
    resource which express a piece of knowledge related to a resource identity
*/
export function makeIdentityQueryFragment(
  iri,
  getLinkedResourcesIdentity,
  linkingPredicate,
  isIriSubject,
  linkedResourcesCount
) {
  const linkingPredicateBinding = linkingPredicate ? `<${linkingPredicate}>` : '?l_p'
  const tripleStructure = isIriSubject
    ? `<${iri}> ${linkingPredicateBinding} ?l_r`
    : `?l_r ${linkingPredicateBinding} <${iri}>`
  const resourceDeclaration = getLinkedResourcesIdentity
    ? `GRAPH ?lr_g {
    ${tripleStructure}`
    : ''
  const resource = getLinkedResourcesIdentity ? '?l_r' : `<${iri}>`

  const count = linkedResourcesCount
    ? `UNION {
      SELECT (COUNT(*) AS ?c_out) ${getLinkedResourcesIdentity ? '?l_r' : ''}
      WHERE { GRAPH ?g_out { ${resource} ?p_out ?r_out } }
      GROUP BY ?c_out ${getLinkedResourcesIdentity ? '?l_r' : ''}
    }
    UNION {
      SELECT (COUNT(*) AS ?c_in) ${getLinkedResourcesIdentity ? '?l_r' : ''}
      WHERE { GRAPH ?g_in { ?r_in ?p_in ${resource} } }
      GROUP BY ?c_in ${getLinkedResourcesIdentity ? '?l_r' : ''}
    }`
    : ''

  return `
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT *
WHERE {
  ${resourceDeclaration}
    {
      OPTIONAL {
        GRAPH ?ir_g {
          ${resource} ?id_p ?id_r .
          FILTER (?id_p IN (rdf:type, crm:P2_has_type, crm:P1_is_identified_by, crm:P102_has_title, rdfs:label))
          OPTIONAL {
            GRAPH ?ir_ir_g {
              OPTIONAL { ?id_r rdfs:label ?id_r_label . }
              OPTIONAL { 
                ?id_r ?id_r_type_p ?id_r_type .
                FILTER (?id_r_type_p IN (rdf:type, crm:P2_has_type))
                OPTIONAL {
                  GRAPH ?ir_ir_ir_g {
                    ?id_r_type ?id_r_type_label_p ?id_r_type_label .
                    FILTER (?id_r_type_label_p IN (rdfs:label, crm:P1_is_identified_by))
                  }
                }
              }
              FILTER (!isLiteral(?id_r))
            }
          }
        }
      }
    }
    ${count}
  ${getLinkedResourcesIdentity === false ? '' : '}'}
}
`
}