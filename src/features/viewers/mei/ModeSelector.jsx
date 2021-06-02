/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, Switch, Typography } from '@material-ui/core'

import { VIEW_STATE_PICKING, VIEW_STATE_READING } from './Mei'

const C = ({ setViewState, viewState }) => {
  return (
    <Box
      css={theme => css`
        align-items: center;
        color: ${theme.palette.primary.text};
        display: flex;
        justify-content: center;
      `}
    >
      <Typography
        css={theme => css`
          color: ${viewState === VIEW_STATE_READING ? theme.palette.primary.main : theme.palette.primary.text};
        `}
      >
        consultation
      </Typography>
      <Switch
        onChange={e => {
          setViewState(e.target.checked ? VIEW_STATE_PICKING : VIEW_STATE_READING)
        }}
      />
      <Typography
        css={theme => css`
          color: ${viewState === VIEW_STATE_PICKING ? theme.palette.primary.main : theme.palette.primary.text};
        `}
      >
        sélection
      </Typography>
    </Box>
  )
}

export default C
