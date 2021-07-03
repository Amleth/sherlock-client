/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from '@material-ui/core'
import React from 'react'
import { DATA_IREMUS_FILES_BASE, DATA_IREMUS_ID_BASE, RDF_PREFIXES } from '../../common/rdf'
import { codes as codesCss, header, HEADER_HEIGHT } from './Resource.css'

const APP_BASE_URI =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    window.location.port +
    '/' +
    process.env.REACT_APP_BASENAME +
    '/'

export function makeTable(bindings) {
    return <table>
        <thead>
            <tr>
                <th>predicate</th>
                <th>linked resource</th>
                <th>graph</th>
            </tr>
        </thead>
        <tbody>
            {bindings.map(b => <tr>
                <td>{formatBinding(b.l_p)}</td>
                <td>{formatBinding(b.l_r)}</td>
                <td>{formatBinding(b.lr_g)}</td>
            </tr>)}
        </tbody>
    </table>
}

export function formatSection(title, col1, col2, col3, results, key, codes) {
    return (
        <section >
            <header css={header}>
                <h2>{title}</h2>
                {codes && codes.length && <div css={codesCss}>
                    {codes
                        .filter(_ => _)
                        .map((code) => makeCode(code, HEADER_HEIGHT))}</div>}
            </header>
            {Object.entries(results).length > 0 && formatTable(col1, col2, col3, results, key)}
        </section>
    )
}

export function formatTable(col1, col2, col3, results, key) {
    return <>
        <table>
            {col1 && col2 && col3 && <thead>
                <tr>
                    <th>{col1}</th>
                    <th>{col2}</th>
                    <th>{col3}</th>
                </tr>
            </thead>}
            <tbody>{formatResults(results, key)}</tbody>
        </table>
    </>
}

export function formatResults(results, key) {
    return Object.entries(results).map(([___, data]) => formatEntityBindings(data, key))
}

export function formatEntityBindings(data, key, graph = true) {
    let i = 0
    return Object.entries(data).map(([______, bindings]) => {
        switch (bindings[0][key].type) {
            case 'literal':
                return (
                    <tr key={i++}>
                        <td>{formatBinding(bindings[0].p)}</td>
                        <td>{formatBinding(bindings[0][key])}</td>
                        {graph && <td>{formatBinding(bindings[0].g)}</td>}
                    </tr>
                )
            case 'uri':
                if (bindings.length === 1) {
                    return (
                        <tr key={i++}>
                            <td>{formatBinding(bindings[0].p)}</td>
                            <td>
                                <div>{formatBinding(bindings[0][key])}</div>
                                {bindings[0].hasOwnProperty(key + '_label') && <div className="labels">{formatBinding(bindings[0][key + '_label'])}</div>}
                            </td>
                            {graph && <td>{formatBinding(bindings[0].g)}</td>}
                        </tr>
                    )
                } else {
                    return (
                        <tr key={i++}>
                            <td>{formatBinding(bindings[0].p)}</td>
                            <td>
                                <div>{formatBinding(bindings[0][key])}</div>
                                <div className="labels">
                                    {bindings
                                        .map((_) => <span key={i++}>{formatBinding(_[key + '_label'])}</span>)
                                        .reduce((prev, curr) => [
                                            prev,
                                            <span className="label-separator" key={curr}>
                                                &nbsp;•{' '}
                                            </span>,
                                            curr,
                                        ])}
                                </div>
                            </td>
                            {graph && <td>{formatBinding(bindings[0].g)}</td>}
                        </tr>
                    )
                }
            default:
                return ''
        }
    })
}

export const formatBinding = b => {
    if (b.type === 'uri') {
        let label = b.value
        for (const prefix in RDF_PREFIXES) {
            if (b.value.startsWith(prefix)) {
                label =
                    (RDF_PREFIXES[prefix] ? RDF_PREFIXES[prefix] + ':' : '') +
                    b.value.substr(prefix.length)
                break
            }
        }
        let href = b.value
        if (href.startsWith(DATA_IREMUS_ID_BASE)) {
            href = href.replace(DATA_IREMUS_ID_BASE, APP_BASE_URI + 'id/')
        }
        else if (href.startsWith(DATA_IREMUS_FILES_BASE)) {
        }
        else {
            href = APP_BASE_URI + 'describe/' + encodeURIComponent(href)
        }
        return <Link href={href}>{label}</Link>
    } else {
        return (
            <React.Fragment>
                <span className="textValue">{b.value}</span>
                {b.hasOwnProperty('xml:lang') && (
                    <span className='xml-lang'>@{b['xml:lang']}</span>
                )}
            </React.Fragment>
        )
    }
}

export function makeCode(code, size) {
    return <div css={theme => css`
        background-color: #111;
        border: 1px solid ${theme.palette.colors.MI_ORANGE};
        color: ${theme.palette.colors.MI_ORANGE};
        height: ${size}px;
        line-height: ${size}px;
        text-align: center;
        width: ${size}px;
    `}
        key={code}>
        {code}
    </div>
}