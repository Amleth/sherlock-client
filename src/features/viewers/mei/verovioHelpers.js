/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ITEM_MARGIN } from '../../../style'
import { COLOR_FOCUS } from './mei.css'

export const makeSelectedNode = (n, removeFromBasket) => {
    let icon = ' ♪'
    return <div key={n.noteNode.id} css={css`
        border: 1px solid #eee;
        margin: ${ITEM_MARGIN}px;
        white-space: nowrap;
        width: 100px;

        &:hover {
          background-color: ${COLOR_FOCUS};
          border: 1px solid ${COLOR_FOCUS};
        }
    `}
        onMouseEnter={() => document.getElementById(n.noteNode.id) && document.getElementById(n.noteNode.id).classList.add('focused')}
        onMouseLeave={() => document.getElementById(n.noteNode.id) && document.getElementById(n.noteNode.id).classList.remove('focused')}
    >
        <div css={css`user-select: none;`}>
            <span css={css`display: inline-block; min-width: 16px;`}>{icon}</span>
            <span css={css``}>{n.noteNode.id}</span>
            <span css={css`float: right; width: 20px;`} onClick={e => removeFromBasket(n)}>×</span>
        </div>
    </div>
}

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
    }

    if (mouseNode, noteNode) {
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
    ]
    s.innerHTML = js_lines.join('\n') + '\n'
    document.body.appendChild(s)
}


export const prout = (mei_uri) => {
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