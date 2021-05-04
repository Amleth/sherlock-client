/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {renderBar} from './bar'
import E13 from './e13/E13'
import Incoming from './incoming/Incoming'
import {fetchOutgoing} from './outgoing/outgoingSlice'
import {isTreeDisplayedToggled} from '../settings/settingsSlice'
import Outgoing from './outgoing/Outgoing'
import Tree from '../tree/Tree'

import {resource, root, TREE_WIDTH} from './Resource.css'
import {findVierwers} from '../../common/viewerSelector'

export const VIEW_PO = 'po'
export const VIEW_E13 = 'e13'
export const VIEW_PS = 'ps'

const C = ({resourceUri, view}) => {
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
  if (outgoing) viewers = findVierwers(outgoing.data)

  return (
    <div css={root}>
      <div
        css={css`
            background-color: white;
            display: ${tree ? 'block' : 'none'};
            height: 100vh;
            overflow-y: scroll;
            position: fixed;
            width: ${TREE_WIDTH}px;
          `}
      >
        <Tree uri={resourceUri}/>
      </div>
      <div
        css={[
          resource,
          css`
            margin-left: ${tree ? TREE_WIDTH : 0}px;
          `,
        ]}
      >
        <header
          css={css`
            width: calc(100% - ${tree ? TREE_WIDTH : 0}px);
          `}
        >
          <h1>{focusedResourceUri}</h1>
          {renderBar(history, outgoing, focusedResourceUri, setSelectedView, viewers, () =>
            dispatch(isTreeDisplayedToggled())
          )}
        </header>
        <main>
          {selectedView === VIEW_PO && <Outgoing resourceUri={focusedResourceUri}/>}
          {selectedView === VIEW_E13 && <E13 resourceUri={focusedResourceUri}/>}
          {selectedView === VIEW_PS && <Incoming resourceUri={focusedResourceUri}/>}
        </main>
      </div>
    </div>
  )
}

export default C
