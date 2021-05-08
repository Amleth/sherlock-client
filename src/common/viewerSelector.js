import { DCTERMS_BASE, IREMUS_RESOURCE_BASE } from './rdf'

export const MEI = 'mei'

export function findViewers(resourceUri, outgoing) {
    const viewers = []

    const sherlockId = resourceUri.includes(IREMUS_RESOURCE_BASE) ? resourceUri.substr(IREMUS_RESOURCE_BASE.length) : resourceUri

    if (outgoing.hasOwnProperty(DCTERMS_BASE + 'format')) {
        if (Object.keys(outgoing[DCTERMS_BASE + 'format']).includes('application/vnd.mei+xml')) {
            viewers.push({
                icon: '🎼',
                label: 'MEI',
                to: '/mei/' + sherlockId,
                type: MEI
            })
        }
    }

    return viewers
}
