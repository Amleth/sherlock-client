/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import styles from './Resource.module.css'
import { DATA_IREMUS_BASE, IREMUS_RESOURCE_BASE, RDF_PREFIXES } from '../../common/rdf'

const APP_BASE_URI =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    window.location.port +
    '/' +
    process.env.REACT_APP_BASENAME +
    '/'


export function formatSection(title, col1, col2, col3, results, key, codes) {
    return (
        <section>
            <header>
                <h2>{title}</h2>
            </header>
            {codes && codes.length && <div css={css`display: flex; margin-bottom: 10px;`}>
                {codes.map((code) => makeCode(code, 50))}</div>}
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

export function formatEntityBindings(data, key) {
    let i = 0
    return Object.entries(data).map(([______, bindings]) => {
        switch (bindings[0][key].type) {
            case 'literal':
                return (
                    <tr key={i++}>
                        <td>{formatBinding(bindings[0].p)}</td>
                        <td>{formatBinding(bindings[0][key])}</td>
                        <td>{formatBinding(bindings[0].g)}</td>
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
                            <td>{formatBinding(bindings[0].g)}</td>
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
                            <td>{formatBinding(bindings[0].g)}</td>
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
        if (href.startsWith(DATA_IREMUS_BASE))
            href = href.replace(DATA_IREMUS_BASE, APP_BASE_URI)
        return b.value.startsWith(IREMUS_RESOURCE_BASE) ? (
            <a href={href}>{label}</a>
        ) : (
            <a href={href} target='_blank' rel='noreferrer'>
                {label}
            </a>
        )
    } else {
        return (
            <React.Fragment>
                <span className={styles.textValue}>{b.value}</span>
                {b.hasOwnProperty('xml:lang') && (
                    <span className='xml-lang'>@{b['xml:lang']}</span>
                )}
            </React.Fragment>
        )
    }
}

export function makeCode(code, size) {
    return <div css={css`
        background-color: #111;
        border: 1px solid #555;
        font-size: 150%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 50px;    
    `}
        key={code}>
        {code}
    </div>
}