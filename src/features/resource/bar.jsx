/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import { VIEW_E13, VIEW_PO, VIEW_PS } from './Resource'
import { COLOR_MI_MAGENTA, COLOR_MI_ORANGE, COLOR_MI_TEAL, COLOR_MI_YELLOW } from '../../style'
import { MEI } from '../../common/viewerSelector'
import { BAR_SIZE } from './Resource.css'

const s = color =>
  css`
    align-items: center;
    color: ${color};
    display: flex;
    justify-content: center;
    height: ${BAR_SIZE}px;
    text-align: center;
    width: 69px;

    &:hover {
      background-color: ${color};
      color: white;
    }
  `

export const renderBar = (history, outgoing, resourceUri, setSelectedView, viewers, toggleIsTreeDisplayed) => (
  <nav>
    <div
      css={css`
        display: flex;
        flex-direction: line;
        width: 100%;
      `}
    >
      <div css={s('aqua')} onClick={e => toggleIsTreeDisplayed()}>
        🌴
      </div>
      <div css={s(COLOR_MI_ORANGE)} onClick={e => setSelectedView(VIEW_PO)}>
        Spo
      </div>
      <div css={s(COLOR_MI_TEAL)} onClick={e => setSelectedView(VIEW_E13)}>
        E13
      </div>
      <div css={s(COLOR_MI_MAGENTA)} onClick={e => setSelectedView(VIEW_PS)}>
        spO
      </div>
      {viewers.map(viewerData => {
        if (viewerData.type === MEI) return makeMeiIcon(history, outgoing, resourceUri, viewerData)
        return null
      })}
    </div>
    <Link
      css={css`
        color: inherited;
        align-items: center;
        display: flex;
        justify-content: center;
        height: ${BAR_SIZE}px;
        text-align: center;
        width: 69px;

        &:hover {
          background-color: aqua;
          color: black;
        }
      `}
      to="/me"
    >
      USER
    </Link>
    <Link
      css={css`
        color: inherited;
        align-items: center;
        display: flex;
        justify-content: center;
        height: ${BAR_SIZE}px;
        text-align: center;
        width: 69px;

        &:hover {
          background-color: aqua;
          color: black;
        }
      `}
      to="/"
    >
      HOME
    </Link>
  </nav>
)

const makeMeiIcon = (history, outgoing, resourceUri, viewerData) => (
  <div
    css={s(COLOR_MI_YELLOW)}
    key={viewerData.label}
    onClick={e =>
      history.push({
        pathname: viewerData.to,
        state: { outgoing },
      })
    }
  >
    {viewerData.label}
  </div>
)
