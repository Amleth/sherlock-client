/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { VIEW_STATE_PICKING, VIEW_STATE_READING } from './Mei'

const C = ({ setViewState, viewState }) => {
  return (
    <div
      onClick={e => {
        if (viewState === VIEW_STATE_PICKING) setViewState(VIEW_STATE_READING)
        else setViewState(VIEW_STATE_PICKING)
      }}
      css={css`
        border-bottom: 1px solid black;
        display: flex;
        height: 36px;

        > div {
          line-height: 36px;
          padding: 0 10px;
          text-align: center;
          width: 100%;
        }
      `}
    >
      <div
        css={css`
          background-color: ${viewState === VIEW_STATE_READING ? 'black' : 'white'};
          color: ${viewState === VIEW_STATE_READING ? 'white' : 'black'};
          &:hover {
            background-color: black;
            color: white;
          }
        `}
      >
        CONSULTATION
      </div>
      <div
        css={css`
          background-color: ${viewState === VIEW_STATE_PICKING ? 'black' : 'white'};
          color: ${viewState === VIEW_STATE_PICKING ? 'white' : 'black'};
          &:hover {
            background-color: black;
            color: white;
          }
        `}
      >
        SELECTION
      </div>
    </div>
  )
}

export default C
