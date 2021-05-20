import { DCTERMS_BASE, IREMUS_RESOURCE_BASE } from './rdf'

export const ANNOTATE = 'annotate'
export const MEI = 'mei'
export const TWEET = 'tweet'

export function findViewers(resourceUri, outgoing) {

    const viewers = []

    const sherlockId = resourceUri.includes(IREMUS_RESOURCE_BASE) ? resourceUri.substr(IREMUS_RESOURCE_BASE.length) : resourceUri

    if (resourceUri.startsWith('https://twitter.com/')) {
        viewers.push({
            color: 'rgba(26,145,218,0.8)',
            label: 'tweet',
            type: TWEET,
            view: ANNOTATE
        })
    }

    if (outgoing.hasOwnProperty(DCTERMS_BASE + 'format')) {
        if (Object.keys(outgoing[DCTERMS_BASE + 'format']).includes('application/vnd.mei+xml')) {
            viewers.push({
                label: 'MEI',
                to: '/mei/' + sherlockId,
                type: MEI
            })
        }
    }

    return viewers
}
