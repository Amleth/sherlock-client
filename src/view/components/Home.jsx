/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { jsx } from '@emotion/core'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div css={{ margin: 'auto', maxWidth: 800 }}>
      <div
        css={{ color: 'DarkTurquoise', fontSize: '111px', margin: '82px 0', textAlign: 'center' }}
      >
        ⬡
      </div>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/skosconceptschemes'>SKOS ConceptSchemes</Link>
        </li>
      </ul>
    </div>
  )
}
