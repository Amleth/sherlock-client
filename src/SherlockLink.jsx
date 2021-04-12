/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const C = ({ color, icon, label, path }) => {
  return (
    <Link
      css={css`
        background-color: white;
        border: 2px solid #${color};
        height: 150px;
        width: 150px;
      `}
      to={path}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </Link>
  )
}
export default C
