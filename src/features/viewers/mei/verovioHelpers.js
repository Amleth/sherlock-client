export const getNodeNote = e => {
    let mouseNode = null
    let noteNode = null

    switch (e.target.tagName) {
        case 'tspan':
        case 'use':
            let parentNode = e.target.parentNode
            while (
                parentNode.classList
                && !parentNode.classList.contains('note')
                && !parentNode.classList.contains('label')
            ) {
                parentNode = parentNode.parentNode
            }
            if (parentNode.classList && parentNode.classList.contains('note')) {
                mouseNode = e.target
                noteNode = parentNode
            }
            break
        default:
            break
    }

    if (mouseNode && noteNode) {
        return { mouseNode, noteNode }
    }
    else return null
}

export const createVerovio = (meiUri) => {
    const s = document.createElement('script')
    s.type = 'module'
    s.async = true
    const js_lines = [
        'import "https://www.verovio.org/javascript/app/verovio-app.js";',
        `window.app = new Verovio.App(document.getElementById("verovio_container"), {
            defaultView: 'document',
            defaultZoom: 3,
        });`,
        `window.verovioCallback("${meiUri}");`,
        // `window.verovioCallback("https://www.verovio.org/editor/brahms.mei");`,
    ]
    s.innerHTML = js_lines.join('\n') + '\n'
    document.body.appendChild(s)
}


export const load = (mei_uri) => {
    fetch(mei_uri, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
    })
        .then(res => res.text())
        .then(res => {
            window.app.loadData(res)
        })
}