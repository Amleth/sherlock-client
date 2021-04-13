/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'

import E13 from './e13/E13'
import Icon from './Icon'
import IconLink from './IconLink'
import Incoming from './incoming/Incoming'
import { fetchOutgoing } from './outgoing/outgoingSlice'
import Outgoing from './outgoing/Outgoing'
import Tree from './tree/Tree'
import { COLOR_MI_MAGENTA, COLOR_MI_ORANGE, COLOR_MI_TEAL, COLOR_MI_YELLOW } from '../../style'
import { bar, MARGIN, resource, root } from './Resource.css'

export const VIEW_PO = 'po'
export const VIEW_E13 = 'e13'
export const VIEW_PS = 'ps'
export const VIEW_P106 = 'p106'

const C = ({ resourceUri, view }) => {
  const dispatch = useDispatch()
  const [selectedView, setSelectedView] = useState(view || VIEW_PO)

  useEffect(() => {
    dispatch(fetchOutgoing(resourceUri))
  }, [dispatch, resourceUri])

  const identity = useSelector((state) => state.identity.entities[resourceUri])
  const outgoing = useSelector((state) => state.outgoing.entities[resourceUri])

  return (
    <div css={root}>
      <Tree identity={identity} outgoing={outgoing} />
      <div css={resource}>
        <header
          css={css`
            border-bottom: 2px dashed #222;
          `}
        >
          <h1>Ressource</h1>
          <div
            css={css`
              display: flex;
            `}
          >
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
          {selectedView === VIEW_PO && <Outgoing identity={identity} outgoing={outgoing} />}
          {selectedView === VIEW_E13 && <E13 resourceUri={resourceUri} />}
          {selectedView === VIEW_PS && <Incoming resourceUri={resourceUri} />}
        </div>
      </div>
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
        {/* <Icon backgroundColor={COLOR_MI_YELLOW} onPress={(e) => setSelectedView(VIEW_P106)}>
          <span
            css={css`
              font-size: 0.82em;
            `}
          >
            P106
          </span>
        </Icon> */}
      </div>
    </div>
    // {Object.keys(outgoingResults).length > 0 && Selector(outgoingResults)}
  )
}

export default C
