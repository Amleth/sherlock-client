// ⎔⬢⬣

/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { jsx } from '@emotion/core'
import parse from 'html-react-parser'
import { RDF_PREFIXES } from '../model/common'
import { COUNTRY_FLAGS } from './constants'
import { MONO_FONT, TEXT_FONT } from './style'

export const makeString = (o) => {
  if (!o) return ''
  // URI
  if (o.startsWith('http')) {
    // Prefixable domain
    if (
      Object.keys(RDF_PREFIXES)
        .map((p) => o.startsWith(p))
        .includes(true)
    ) {
      let sep = '/'
      if (o.includes('#')) sep = '#'
      let prefix = ''
      for (const [_base_uri, _prefix] of Object.entries(RDF_PREFIXES)) {
        if (o.startsWith(_base_uri)) prefix = _prefix
      }
      const parts = o.split(sep)
      const id = parts.slice(-1)[0]

      if (o.startsWith(process.env.REACT_APP_SHERLOCK_DATA_BASE_URL)) {
        return (
          <span className='uri'>
            <a href={process.env.PUBLIC_URL + '/id/' + id}>{id}</a>
            &nbsp;
            <a
              href={process.env.REACT_APP_SHERLOCK_SERVICE_BASE_URL + 'id/' + id}
              target='_blank'
              rel='noopener noreferrer'
              css={{ fontFamily: MONO_FONT, textDecoration: 'none' }}
            >
              <span
                role='img'
                aria-label='Sherlock API URI'
                css={{
                  color: 'gray',
                  wordBreak: 'keep-all',
                  '&:hover': { color: 'darkgray' }
                }}
              >
                {'{api}'}
              </span>
            </a>
          </span>
        )
      } else {
        return (
          <a className='uri' href={o} target='_blank' rel='noopener noreferrer'>
            {prefix + ':' + id}
          </a>
        )
      }
    }
    // Non-Prefixable domain
    else {
      return (
        <a className='uri' href={o} target='_blank' rel='noopener noreferrer'>
          {o}
        </a>
      )
    }
  } else {
    if (o.includes('^^http://www.w3.org/2001/XMLSchema#')) {
      return o.split('^^http://www.w3.org/2001/XMLSchema#')[0]
    } else {
      for (let lang in COUNTRY_FLAGS) {
        const suffix = '@' + lang
        if (o.endsWith(suffix))
          return (
            <span
              key={lang}
              css={{
                color: 'dimgray',
                fontFamily: TEXT_FONT
              }}
            >
              <span>{parse(o.substring(0, o.length - suffix.length))}</span>
              &nbsp;<span css={{ color: 'darkgray' }}>@{lang}</span>
            </span>
          )
      }
    }
    return <span css={{ color: 'dimgray', fontFamily: TEXT_FONT }}>{parse(o)}</span>
  }
}

export const formatInt = (_) => parseInt(_.split('^^')[0])

export const formatGraphName = (_) => _.split('/').slice(-1)

export const hex = <div css={{ color: 'lightgray', marginTop: '1rem' }}>⬡</div>
