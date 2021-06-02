/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ITEM_MARGIN } from '../../../style'
import { COLOR_FOCUS } from './mei.css'

const makeSelectedNode = (n, removeFromBasket) => {
  let icon = ' ♪'
  return (
    <div
      key={n.noteNode.id}
      css={css`
        border: 1px solid #eee;
        margin: ${ITEM_MARGIN}px;
        white-space: nowrap;
        width: 100px;

        &:hover {
          background-color: ${COLOR_FOCUS};
          border: 1px solid ${COLOR_FOCUS};
        }
      `}
      onMouseEnter={() =>
        document.getElementById(n.noteNode.id) && document.getElementById(n.noteNode.id).classList.add('focused')
      }
      onMouseLeave={() =>
        document.getElementById(n.noteNode.id) && document.getElementById(n.noteNode.id).classList.remove('focused')
      }
    >
      <div
        css={css`
          user-select: none;
        `}
      >
        <span
          css={css`
            display: inline-block;
            min-width: 16px;
          `}
        >
          {icon}
        </span>
        <span css={css``}>{n.noteNode.id}</span>
        <span
          css={css`
            float: right;
            width: 20px;
          `}
          onClick={e => removeFromBasket(n)}
        >
          ×
        </span>
      </div>
    </div>
  )
}

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
