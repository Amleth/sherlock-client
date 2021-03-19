/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { style } from './Icon'

const C = ({ backgroundColor, children, uri }) => {
  return (
    <Link
      to={uri}
      css={css`
        color: white;
        cursor: default;
        text-decoration: none;
      `}
    >
      <div css={style(backgroundColor)}>{children}</div>
    </Link>
  )
}

export default C
