/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import E13 from './e13/E13'
import Icon from './Icon'
import IconLink from './IconLink'
import IncomingPredicates from './incoming/IncomingPredicates'
import OutcomingPredicates from './outcoming/OutcomingPredicates'
import { BAR_SIZE, MARGIN } from './style'
import { COLOR_MI_MAGENTA, COLOR_MI_ORANGE, COLOR_MI_TEAL } from '../../style'

export const PANEL_Spo = 'Spo'
export const PANEL_E13 = 'E13'
export const PANEL_spO = 'spO'

const C = ({ resourceUri }) => {
  resourceUri = decodeURIComponent(resourceUri)

  const [selectedPanel, setSelectedPanel] = useState(PANEL_Spo)

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <div
        css={css`
          background-color: #222;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: fixed;
        `}
      >
        <IconLink backgroundColor="black" uri="/">
          <span
            css={css`
              font-size: 55px;
            `}
          >
            ⌂
          </span>
        </IconLink>
        <Icon backgroundColor={COLOR_MI_ORANGE} onPress={(e) => setSelectedPanel(PANEL_Spo)}>
          <span>S</span>
          <span
            css={css`
              color: rgba(0, 0, 0, 0.3);
            `}
          >
            po
          </span>
        </Icon>
        <Icon backgroundColor={COLOR_MI_TEAL} onPress={(e) => setSelectedPanel(PANEL_E13)}>
          E13
        </Icon>
        <Icon backgroundColor={COLOR_MI_MAGENTA} onPress={(e) => setSelectedPanel(PANEL_spO)}>
          <span
            css={css`
              color: rgba(0, 0, 0, 0.3);
            `}
          >
            sp
          </span>
          <span>O</span>
        </Icon>
      </div>
      <div
        css={css`
          margin: 0 ${MARGIN}px 0 ${BAR_SIZE + MARGIN}px;
        `}
      >
        <h1
          css={css`
            color: #ddd;
            font-size: 200%;
            font-weight: 300;
            height: var(--bar-size);
            letter-spacing: 6px;
            margin: 0;
            padding: 0;
            padding-top: 30px;
            text-transform: uppercase;
          `}
        >
          Ressource
        </h1>
        <div>
          <span
            css={css`
              color: #666;
              margin-right: 10px;
              &:after {
                content: '⬡';
              }
            `}
          ></span>
          <span>{resourceUri}</span>
        </div>
        {selectedPanel === PANEL_Spo && <OutcomingPredicates resourceUri={resourceUri} />}
        {selectedPanel === PANEL_E13 && <E13 resourceUri={resourceUri} />}
        {selectedPanel === PANEL_spO && <IncomingPredicates resourceUri={resourceUri} />}
      </div>
    </div>
    // {Object.keys(outcomingPredicatesResults).length > 0 && Selector(outcomingPredicatesResults)}
  )
}

export default C
