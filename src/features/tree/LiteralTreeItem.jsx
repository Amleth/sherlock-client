/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DateRange, Label } from '@material-ui/icons'
import { Box } from '@material-ui/core'
import TreeItem from '@material-ui/lab/TreeItem'
import TransitionComponent from './TransitionComponent'

import type from './datatype'
import { Typography } from '@material-ui/core'

const LiteralTreeItem = ({ path, literal }) => {
  return (
    <TreeItem
      key={path}
      label={
        <Box
          css={css`
            display: flex;
          `}
        >
          <Box
            component={computeLabelIcon(literal.datatype)}
            css={css`
              width: 33px;
            `}
          />
          <Typography
            css={css`
              font-size: 0.875rem;
            `}
          >
            {literal.value}
          </Typography>
        </Box>
      }
      nodeId={path}
      TransitionComponent={TransitionComponent}
    />
  )
}

function computeLabelIcon(datatype) {
  switch (datatype) {
    case type.date:
      return DateRange
    default:
      return Label
  }
}

export default LiteralTreeItem
