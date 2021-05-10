/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

import { VIEW_E13, VIEW_PO, VIEW_PS } from './Resource'
import { COLOR_MI_GREEN, COLOR_MI_MAGENTA, COLOR_MI_ORANGE, COLOR_MI_TEAL, COLOR_MI_YELLOW, darken } from '../../style'
import { MEI } from '../../common/viewerSelector'
import { BAR_SIZE, MARGIN } from './Resource.css'

const makeLink = ({ c1 = '', c2 = '', label = '', labelColor = 'white', onClick = '', title = '' }) => {
  if (!c2) c2 = darken(c1, 0.5)
  return (
    <Link
      css={css`
        background: none;
        color: ${labelColor};
        text-align: center;
        width: 60px;

        &:hover {
          color: ${labelColor};

          ${neonlink(c1, c2, label)}
        }
      `}
      onClick={onClick}
      title={title}
    >
      <div
        css={css`
          background-color: black;
          margin: 1px;
          padding: 5px;
        `}
      >
        {label}
      </div>
    </Link>
  )
}

// const s = color =>
//   css`
//     align-items: center;
//     color: ${color};
//     display: flex;
//     justify-content: center;
//     height: ${BAR_SIZE}px;
//     text-align: center;
//     width: 69px;

//     &:hover {
//       background-color: ${color};
//       color: white;
//     }
//   `

export const renderBar = (history, outgoing, resourceUri, setSelectedView, viewers, toggleIsTreeDisplayed) => (
  <nav
    css={css`
      display: flex;
      flex-direction: line;
      margin-top: ${MARGIN};
      padding: 0 ${MARGIN};
      width: 100%;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: line;
        // gap: 11px;
        width: 100%;
      `}
    >
      {' '}
      {[
        {
          c1: 'rgba(0, 255, 0, 1)',
          label: '🌴',
          labelColor: '',
          onClick: e => toggleIsTreeDisplayed(),
          title: "afficher/masquer l'arbre",
        },
        {
          c1: 'rgba(0, 255, 0, 1)',
          label: '🪴',
          labelColor: '',
          onClick: e => history.push('/describe/' + encodeURIComponent(resourceUri)),
          title: "réenraciner l'arbre sur la ressource courante",
        },
        {
          c1: COLOR_MI_ORANGE,
          label: 'Spo',
          labelColor: COLOR_MI_ORANGE,
          onClick: e => setSelectedView(VIEW_PO),
        },
        {
          c1: COLOR_MI_TEAL,
          label: 'E13',
          labelColor: COLOR_MI_TEAL,
          // onClick: e => setSelectedView(VIEW_E13),
        },
        {
          c1: COLOR_MI_MAGENTA,
          label: 'spO',
          labelColor: COLOR_MI_MAGENTA,
          onClick: e => setSelectedView(VIEW_PS),
        },
      ]
        .concat(
          viewers.map(_ => ({
            c1: COLOR_MI_YELLOW,
            label: _.label,
            labelColor: COLOR_MI_YELLOW,
            onClick: e => history.push(_.to),
          }))
        )
        .map(_ => makeLink(_))}
    </div>
  </nav>
)

const neonlink = (c1, c2, label) => `background: linear-gradient(90deg, ${c2}, ${c1});
-webkit-animation: neonlink_${label} 0.69s linear infinite;
   -moz-animation: neonlink_${label} 0.69s linear infinite;
        animation: neonlink_${label} 0.69s linear infinite;

@-webkit-keyframes neonlink_${label} {
  0%   {background: linear-gradient(   0deg, ${c2}, ${c1})}
  10%  {background: linear-gradient(  36deg, ${c2}, ${c1})}
  20%  {background: linear-gradient(  72deg, ${c2}, ${c1})}
  30%  {background: linear-gradient( 108deg, ${c2}, ${c1})}
  40%  {background: linear-gradient( 144deg, ${c2}, ${c1})}
  50%  {background: linear-gradient( 180deg, ${c2}, ${c1})}
  60%  {background: linear-gradient( 216deg, ${c2}, ${c1})}
  70%  {background: linear-gradient( 252deg, ${c2}, ${c1})}
  80%  {background: linear-gradient( 288deg, ${c2}, ${c1})}
  90%  {background: linear-gradient( 324deg, ${c2}, ${c1})}
  100% {background: linear-gradient( 360deg, ${c2}, ${c1})}
}
@-moz-keyframes neonlink_${label} {
  0%   {background: linear-gradient(   0deg, ${c2}, ${c1})}
  10%  {background: linear-gradient(  36deg, ${c2}, ${c1})}
  20%  {background: linear-gradient(  72deg, ${c2}, ${c1})}
  30%  {background: linear-gradient( 108deg, ${c2}, ${c1})}
  40%  {background: linear-gradient( 144deg, ${c2}, ${c1})}
  50%  {background: linear-gradient( 180deg, ${c2}, ${c1})}
  60%  {background: linear-gradient( 216deg, ${c2}, ${c1})}
  70%  {background: linear-gradient( 252deg, ${c2}, ${c1})}
  80%  {background: linear-gradient( 288deg, ${c2}, ${c1})}
  90%  {background: linear-gradient( 324deg, ${c2}, ${c1})}
  100% {background: linear-gradient( 360deg, ${c2}, ${c1})}
}
@keyframes neonlink_${label} {
  0%   {background: linear-gradient(   0deg, ${c2}, ${c1})}
  10%  {background: linear-gradient(  36deg, ${c2}, ${c1})}
  20%  {background: linear-gradient(  72deg, ${c2}, ${c1})}
  30%  {background: linear-gradient( 108deg, ${c2}, ${c1})}
  40%  {background: linear-gradient( 144deg, ${c2}, ${c1})}
  50%  {background: linear-gradient( 180deg, ${c2}, ${c1})}
  60%  {background: linear-gradient( 216deg, ${c2}, ${c1})}
  70%  {background: linear-gradient( 252deg, ${c2}, ${c1})}
  80%  {background: linear-gradient( 288deg, ${c2}, ${c1})}
  90%  {background: linear-gradient( 324deg, ${c2}, ${c1})}
  100% {background: linear-gradient( 360deg, ${c2}, ${c1})}
}`
