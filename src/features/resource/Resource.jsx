/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { renderBar } from './bar'
import E13 from './e13/E13'
import Incoming from './incoming/Incoming'
import { fetchOutgoing } from './outgoing/outgoingSlice'
import { isTreeDisplayedToggled } from '../settings/settingsSlice'
import Outgoing from './outgoing/Outgoing'
import Tree from '../tree/Tree'
import Tweet from '../twitter/Tweet'

import { resource, root, separator } from './Resource.css'
import { findViewers } from '../../common/viewerSelector'
import { ANNOTATE as VIEW_ANNOTATE } from '../../common/viewerSelector'

export const VIEW_PO = 'po'
export const VIEW_E13 = 'e13'
export const VIEW_PS = 'ps'

const C = ({ resourceUri, view }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [selectedView, setSelectedView] = useState(view || VIEW_PO)

  const tree = useSelector(state => state.settings.isTreeDisplayed)
  const focusedResourceUri = useSelector(state => state.settings.focusedResourceUri) || resourceUri

  useEffect(() => {
    dispatch(fetchOutgoing(focusedResourceUri))
  }, [dispatch, focusedResourceUri])
  const outgoing = useSelector(state => state.outgoing.entities[focusedResourceUri])
  let viewers = []
  if (outgoing) viewers = findViewers(resourceUri, outgoing.data)

  return (
    <div css={root}>
      <div
        css={css`
          display: ${tree ? 'block' : 'none'};
          height: 100vh;
          overflow-y: scroll;
          position: fixed;
          width: ${tree ? '33%' : 0};
        `}
      >
        <Tree uri={resourceUri} />
      </div>
      <div
        css={[
          resource,
          css`
            margin-left: ${tree ? '33%' : 0};
          `,
        ]}
      >
        <header
          css={css`
            width: calc(100% - ${tree ? '33%' : '0%'});
          `}
        >
          <h1>{focusedResourceUri}</h1>
          {renderBar(history, outgoing, focusedResourceUri, setSelectedView, viewers, () =>
            dispatch(isTreeDisplayedToggled())
          )}
          <div css={separator} />
        </header>
        <main>
          {selectedView === VIEW_PO && <Outgoing resourceUri={focusedResourceUri} />}
          {selectedView === VIEW_E13 && <E13 resourceUri={focusedResourceUri} />}
          {selectedView === VIEW_PS && <Incoming resourceUri={focusedResourceUri} />}
          {focusedResourceUri.startsWith('https://twitter.com/') && selectedView === VIEW_ANNOTATE && (
            <Tweet resourceUri={focusedResourceUri} />
          )}
        </main>
      </div>
    </div>
  )
}

export default C
