/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect } from 'react'

import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useDispatch } from 'react-redux'

import { rootSet, getResourceIdentity } from './treeSlice'
import IriTreeItem from './IriTreeItem'

const Tree = ({ uri }) => {
  const dispatch = useDispatch()
  const path = ''

  useEffect(() => {
    dispatch(rootSet(uri))
    dispatch(getResourceIdentity(uri))
  }, [dispatch, uri])

  return (
    <TreeView
      css={css`
        user-select: none;
          overflow-y: auto;
          overflow-x: auto;
      `}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <IriTreeItem path={path} uri={uri} nodeId={path + uri + ','} />
    </TreeView>
  )
}

export default Tree
