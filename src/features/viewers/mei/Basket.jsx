/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { makeSelectedNode } from './verovioHelpers'
import { ITEM_MARGIN } from '../../../style'
import { COLOR_FOCUS } from './mei.css'

const C = ({ data, removeFromBasket }) => {
  return Object.entries(data).length ? (
    <div
      css={css`
        border-bottom: 1px solid black;
        padding: ${ITEM_MARGIN}px;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: 0 auto;
        `}
      >
        {Object.entries(data).map(([id, node]) => makeSelectedNode(node, removeFromBasket))}
      </div>
    </div>
  ) : (
    <div />
  )
}

export default C
