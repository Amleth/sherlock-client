/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles'
import { AppBar as MuiAppBar, Box, Button, Drawer, Toolbar, Typography } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'

// import { renderBar } from './bar'
import E13 from './e13/E13'
import Incoming from './incoming/Incoming'
import { fetchOutgoing } from './outgoing/outgoingSlice'
import Outgoing from './outgoing/Outgoing'
import Tree from '../tree/Tree'
import Tweet from '../twitter/Tweet'

import { drawerStyle, DRAWER_WIDTH, triplesTableStyle } from './Resource.css'
import { findViewers } from '../../common/viewerSelector'
import { ANNOTATE as VIEW_ANNOTATE } from '../../common/viewerSelector'
import BottomPanel from '../tree/BottomPanel'
import Avatar from '@material-ui/core/Avatar'
import { stringAvatar } from '../../common/utils'
import AddE13 from './addE13/AddE13'

export const VIEW_ADD = 'add'
export const VIEW_PO = 'po'
export const VIEW_E13 = 'e13'
export const VIEW_PS = 'ps'

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: '-' + DRAWER_WIDTH,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH})`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

export default function C({ resourceUri, view }) {
  const dispatch = useDispatch()
  const history = useNavigate()
  const theme = useTheme()
  const location = useLocation()

  const focusedResourceUri = useSelector(state => state.settings.focusedResourceUri) || resourceUri
  const user = useSelector(state => state.user)
  const bottomPanelResources = useSelector(state => state.tree.bottomPanelResources)
  const [treeDisplayed, setTreeDisplayed] = useState(localStorage.getItem('treeDisplayed') === 'true')
  const [selectedView, setSelectedView] = useState(view || VIEW_PO)

  function _setTreeDisplayed() {
    const _ = !(localStorage.getItem('treeDisplayed') === 'true')
    localStorage.setItem('treeDisplayed', _)
    setTreeDisplayed(_)
  }

  useEffect(() => {
    dispatch(fetchOutgoing(focusedResourceUri))
  }, [dispatch, focusedResourceUri])
  const outgoing = useSelector(state => state.outgoing.entities[focusedResourceUri])
  let viewers = []
  if (outgoing) viewers = findViewers(resourceUri, outgoing.data)

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        open={treeDisplayed}
        style={{ background: theme.palette.background.default }}
        elevation={0}
      >
        <Toolbar>
          <Typography
            component="h1"
            css={theme => css`
              color: turquoise;
              font-family: ${theme.typography.fontFamilyMonospaced};
              font-weight: bold;
              text-shadow: 0 0 15px aqua;
            `}
          >
            {focusedResourceUri}
          </Typography>
        </Toolbar>
        <Toolbar
          css={css`
            justify-content: space-between;
            & > * {
              margin-right: 10px;
            }
          `}
        >
          <Box>
            <Button onClick={() => _setTreeDisplayed()} variant="outlined">
              🌴
            </Button>
            &nbsp;
            <Button
              onClick={() => history.push('/describe/' + encodeURIComponent(focusedResourceUri))}
              variant="outlined"
            >
              🪴
            </Button>
            &nbsp;
            <Button
              sx={{ color: theme => theme.palette.colors.MI_ORANGE }}
              onClick={() => setSelectedView(VIEW_PO)}
              variant="outlined"
            >
              OUTGOING
            </Button>
            &nbsp;
            <Button
              sx={{ color: theme => theme.palette.colors.MI_MAGENTA }}
              onClick={() => setSelectedView(VIEW_PS)}
              variant="outlined"
            >
              INCOMING
            </Button>
            &nbsp;
            <Button
              sx={{ color: theme => theme.palette.colors.MI_TEAL }}
              onClick={() => setSelectedView(VIEW_E13)}
              variant="outlined"
            >
              E13
            </Button>
            &nbsp;
            {user && user.access_token && (
              <Button onClick={() => setSelectedView(VIEW_ADD)} variant="outlined">
                +
              </Button>
            )}
            {viewers.map(v => (
              <Button key={v.to} onClick={() => history.push(v.to)} variant="outlined">
                {v.label}
              </Button>
            ))}
          </Box>
          <Box>
            {user && user.access_token ? (
              <Avatar
                {...stringAvatar(user.username)}
                align="right"
                css={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
                onClick={() => history.push('/me/')}
              />
            ) : (
              <Link
                to={{
                  pathname: '/login',
                  query: { nextURL: location.pathname },
                }}
              >
                <Button align="right" onClick={() => history.push('/login')}>
                  🔒 Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
        <div
          css={css`
            background: linear-gradient(90deg, #033, aqua, fuchsia, hotpink);
            height: 1px;
            width: 100%;
          `}
        />
      </AppBar>
      <Drawer sx={drawerStyle(theme)} variant="persistent" anchor="left" open={treeDisplayed}>
        <Tree uri={resourceUri} />
        {bottomPanelResources.p !== null && bottomPanelResources.relatedUri !== null && (
          <Box
            css={css`
              height: 50vh;
              border-top: 1px solid #033;
              flex-shrink: 0;
              width: 100%;
            `}
          >
            <BottomPanel relatedResourceUri={bottomPanelResources.relatedUri} predicateUri={bottomPanelResources.p} />
          </Box>
        )}
      </Drawer>

      <Main open={treeDisplayed} css={triplesTableStyle}>
        <Offset
          css={css`
            height: 159px;
          `}
        />
        {selectedView === VIEW_ADD && <AddE13 resourceUri={focusedResourceUri} />}
        {selectedView === VIEW_PO && <Outgoing resourceUri={focusedResourceUri} />}
        {selectedView === VIEW_E13 && <E13 resourceUri={focusedResourceUri} />}
        {selectedView === VIEW_PS && <Incoming resourceUri={focusedResourceUri} />}
        {focusedResourceUri.startsWith('https://twitter.com/') && selectedView === VIEW_ANNOTATE && (
          <Tweet resourceUri={focusedResourceUri} />
        )}
      </Main>
    </Box>
  )
}
