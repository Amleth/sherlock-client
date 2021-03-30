/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'
import E13 from './e13/E13'
import Icon from './Icon'
import IconLink from './IconLink'
import IncomingPredicates from './incoming/IncomingPredicates'
import OutcomingPredicates from './outcoming/OutcomingPredicates'
import { COLOR_MI_MAGENTA, COLOR_MI_ORANGE, COLOR_MI_TEAL, COLOR_MI_YELLOW } from '../../style'
import { bar, MARGIN, resource, root } from './Resource.css'

export const VIEW_PO = 'po'
export const VIEW_E13 = 'e13'
export const VIEW_PS = 'ps'
export const VIEW_P106 = 'p106'

const C = ({ resourceUri, view }) => {
  resourceUri = decodeURIComponent(resourceUri)

  const [selectedView, setSelectedView] = useState(view || VIEW_PO)

  return (
    <div css={root}>
      <div css={bar}>
        <IconLink backgroundColor="black" uri="/">
          <span
            css={css`
              font-size: 55px;
            `}
          >
            ⌂
          </span>
        </IconLink>
        <Icon backgroundColor={COLOR_MI_ORANGE} onPress={(e) => setSelectedView(VIEW_PO)}>
          <span>S</span>
          <span
            css={css`
              color: rgba(0, 0, 0, 0.3);
            `}
          >
            po
          </span>
        </Icon>
        <Icon backgroundColor={COLOR_MI_TEAL} onPress={(e) => setSelectedView(VIEW_E13)}>
          <span
            css={css`
              font-size: 0.8em;
            `}
          >
            E13
          </span>
        </Icon>
        <Icon backgroundColor={COLOR_MI_MAGENTA} onPress={(e) => setSelectedView(VIEW_PS)}>
          <span
            css={css`
              color: rgba(0, 0, 0, 0.3);
            `}
          >
            sp
          </span>
          <span>O</span>
        </Icon>
        <Icon backgroundColor={COLOR_MI_YELLOW} onPress={(e) => setSelectedView(VIEW_P106)}>
          <span
            css={css`
              font-size: 0.82em;
            `}
          >
            P106
          </span>
        </Icon>
      </div>
      <div css={resource}>
        <header
          css={css`
            border-bottom: 2px dashed #222;
          `}
        >
          <h1>Ressource</h1>
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
        </header>
        <div
          css={css`
            // background-color: blue;
            margin-top: ${MARGIN / 2}px;
          `}
        >
          {selectedView === VIEW_PO && <OutcomingPredicates resourceUri={resourceUri} />}
          {selectedView === VIEW_E13 && <E13 resourceUri={resourceUri} />}
          {selectedView === VIEW_PS && <IncomingPredicates resourceUri={resourceUri} />}
        </div>
      </div>
    </div>
    // {Object.keys(outcomingPredicatesResults).length > 0 && Selector(outcomingPredicatesResults)}
  )
}

export default C
