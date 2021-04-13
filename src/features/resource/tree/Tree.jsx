/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
// import { tree } from '../Resource.css'
// import TreeView from '@material-ui/lab/TreeView'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ChevronRightIcon from '@material-ui/icons/ChevronRight'
// import { useDispatch, useSelector } from 'react-redux'

// import { style } from '../../tree.css'
// import { sparqlEndpoint } from '../../sparql'
// import CustomTreeItem from '../../CustomTreeItem'
// import { propertiesToSkipAsSparqlFilter } from '../../common'
// import * as common from '../../common'
// import { fetchUri } from './treeSlice'

const Tree = ({ identity, outgoing }) => {
  // const treeData = useSelector((state) => state.tree.treeData)
  // const selectedItem = useSelector((state) => state.tree.uri)
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(fetchUri(resourceUri))
  // }, [resourceUri])

  // return (
  //   <div css={style}>
  //     <h1>{uri}</h1>
  //     <div>Item sélectionné : {JSON.stringify(selectedItem)}</div>
  //     <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
  //       <CustomTreeItem treeData={treeData} uri={resourceUri} />
  //     </TreeView>
  //   </div>
  // )

  return <div>Je suis un arbre !</div>
}

export default Tree
