// https://github.com/mui-org/material-ui/blob/v5.0.0-alpha.34/docs/src/pages/components/tree-view/IconExpansionTreeView.js

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'

import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useDispatch } from 'react-redux'

import { rootSet, getResourceIdentity } from './treeSlice'
import IriTreeItem from './IriTreeItem'
import TreeItem from '@material-ui/lab/TreeItem'

const Tree = ({ uri }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(rootSet(uri))
    dispatch(getResourceIdentity(uri))
  }, [dispatch, uri])

  return (
    <TreeView
      css={css`
        .makeStyles-content-2 {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <IriTreeItem path="" uri={uri} />
    </TreeView>
  )
}

export default Tree
