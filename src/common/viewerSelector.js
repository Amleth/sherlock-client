import { DCTERMS_BASE, CRM_BASE } from './rdf'

export const MEI = 'mei'

export function findVierwers(outgoing) {
    const viewers = []
    if (outgoing.hasOwnProperty(DCTERMS_BASE + 'format')) {
        if (Object.keys(outgoing[DCTERMS_BASE + 'format']).includes('application/vnd.mei+xml')) {
            for (const p in outgoing) {
                if (p === CRM_BASE + 'P1_is_identified_by') {
                    for (const o in outgoing[p]) {
                        const result = outgoing[p][o][0];
                        if (result.o_label.value.endsWith('.mei')) {
                            viewers.push({
                                icon: '🎼',
                                label: 'MEI',
                                to: `/mei?mei_uri=${encodeURIComponent(result.o_label.value)}`,
                                type: MEI
                            })
                        }
                    }
                }
            }
        }
    }
    return viewers
}
