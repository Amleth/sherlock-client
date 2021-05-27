/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, Button } from '@material-ui/core'

import { VIEW_E13, VIEW_PO, VIEW_PS } from './Resource'
import { darken } from '../../style'
import { MARGIN } from './Resource.css'

const makeLink = ({ c1 = '', c2 = '', label = '', labelColor = 'white', onClick = '', title = '' }) => {
  if (!c2) c2 = darken(c1, 0.5)

  return (
    <Button key={label} variant="outlined">
      Primary
    </Button>
  )

  return (
    <div
      key={label}
      css={css`
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
    </div>
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

export const renderBar = (theme, history, outgoing, resourceUri, setSelectedView, viewers, toggleIsTreeDisplayed) => {
  return (
    <nav
      css={css`
        display: flex;
        flex-direction: line;
        margin-top: ${MARGIN};
        padding: 0 ${MARGIN};
        width: 100%;
      `}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
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
            c1: theme.palette.colors.MI_ORANGE,
            label: 'Spo',
            labelColor: theme.palette.colors.MI_ORANGE,
            onClick: e => setSelectedView(VIEW_PO),
          },
          {
            c1: theme.palette.colors.MI_TEAL,
            label: 'E13',
            labelColor: theme.palette.colors.MI_TEAL,
            onClick: e => setSelectedView(VIEW_E13),
          },
          {
            c1: theme.palette.colors.MI_MAGENTA,
            label: 'spO',
            labelColor: theme.palette.colors.MI_MAGENTA,
            onClick: e => setSelectedView(VIEW_PS),
          },
        ]
          .concat(
            viewers.map(_ => {
              return {
                c1: _.color || theme.palette.colors.MI_YELLOW,
                label: _.label,
                labelColor: _.color || theme.palette.colors.MI_YELLOW,
                onClick: e => (_.to ? history.push(_.to) : setSelectedView(_.view)),
              }
            })
          )
          .map(_ => makeLink(_))}
      </Box>
    </nav>
  )
}

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
