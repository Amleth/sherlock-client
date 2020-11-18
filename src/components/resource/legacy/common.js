// ⎔⬢⬣

import { css } from '@emotion/css'
import parse from 'html-react-parser'
import { IREMUS_RESOURCE_BASE, IREMUS_NS_BASE, PRIORITIZED_RDF_PREFIXES } from '../model/common'
import { COUNTRY_FLAGS } from './constants'
import { MONO_FONT, TEXT_FONT } from '../../../style'
import { SERVICE_BASE_URI } from '../../../sherlock'

export const formatString = (o) => {
  if (!o) return ''
  // URI
  if (o.startsWith('http')) {
    let prefix = ''
    let id = o
    for (const [full, short] of PRIORITIZED_RDF_PREFIXES) {
      if (o.startsWith(full)) {
        prefix = short
        id = o.substring(full.length)
        break
      }
    }

    if (o.startsWith(IREMUS_RESOURCE_BASE) || o.startsWith(IREMUS_NS_BASE)) {
      // /id/ (resrource) ou /ns/ (ontologie)
      const sherlock_type = o.startsWith(IREMUS_NS_BASE) ? 'ns' : 'id'

      return (
        <span className='uri'>
          <a href={process.env.PUBLIC_URL + '/' + sherlock_type + '/' + id}>
            {prefix + (prefix ? ':' : '') + id}
          </a>
          &nbsp;
          {/* <a
            href={SERVICE_BASE_URI() + sherlock_type + '/' + id}
            target='_blank'
            rel='noopener noreferrer'
            className={css`font-family: ${MONO_FONT}; text-decoration: none;`}
          >
            <span
              role='img'
              aria-label='Sherlock API URI'
              className={css`color: gray; word-break: keep-all; &:hover: { color: darkgray }`}
            >
              {'{api}'}
            </span>
          </a> */}
        </span>
      )
    } else {
      return (
        <a className='uri' href={o} target='_blank' rel='noopener noreferrer'>
          {prefix + (prefix ? ':' : '') + id}
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
              className={css`color: dimgray; font-family: ${TEXT_FONT};`}
            >
              <span>{parse(o.substring(0, o.length - suffix.length))}</span>
              &nbsp;<span className={css`color: darkgray;`}>@{lang}</span>
            </span>
          )
      }
    }
    return <span className={css`color: dimgray; font-family: ${TEXT_FONT};`}>{parse(o)}</span>
  }
}

export const formatGraphName = (_) => _.split('/').slice(-1)
