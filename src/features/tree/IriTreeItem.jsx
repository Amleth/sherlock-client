import CircularProgress from '@material-ui/core/CircularProgress'
import {ArrowLeft, ArrowRight, Public} from '@material-ui/icons'
import TreeItem from '@material-ui/lab/TreeItem'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TransitionComponent from './TransitionComponent'
import { getResourcePredicates, pathUnfoldStatusChanged, selectResourceByUri } from './treeSlice'
import SherlockTreeItemContent from './SherlockTreeItemContent'
import PredicateTreeItem from './PredicateTreeItem'
import { focusedResourceUriSet } from '../settings/settingsSlice'
import Typography from "@material-ui/core/Typography";
import {Button} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const IriTreeItem = ({ nodeId, path, uri, ...props }) => {
  const dispatch = useDispatch()
  const resource = useSelector(state => selectResourceByUri(state, uri))
  const unfoldedPaths = useSelector(state => state.tree.unfoldedPaths)
  const c_in = resource ? resource.identity.find(row => row.c_in) : null;
  const c_out = resource ? resource.identity.find(row => row.c_out) : null;
  console.log(c_in)
  return canShowItem(resource, unfoldedPaths, path) ? (
    <TreeItem
      ContentComponent={SherlockTreeItemContent}
      ContentProps={{
        onIconClick: () => {
          dispatch(pathUnfoldStatusChanged(`${path}${resource.id},`))
          dispatch(getResourcePredicates(resource.id))
        },
        onLabelClick: e => {
          e.preventDefault()
          dispatch(focusedResourceUriSet(resource.id))
        },
        labelIcon: Public,
        labelInfo: <React.Fragment>
          <Typography fontWeight="bold" sx={{ color: theme => theme.palette.colors.MI_MAGENTA }} display="inline" noWrap>{c_in ? c_in.c_in.value : 0} </Typography>-
          <Typography fontWeight="bold" sx={{ color: theme => theme.palette.colors.MI_ORANGE }} display="inline" noWrap> {c_out ? c_out.c_out.value : 0}</Typography>
        </React.Fragment>,
        labelText: resource.label,
      }}
      nodeId={nodeId}
      TransitionComponent={TransitionComponent}
      {...props}
    >
      {resource.predicates &&
        resource.predicates.map(predicate => {
          const id = `${path},${resource.id},${predicate.p.value},${predicate.direction.value},`
          return (
            <PredicateTreeItem
              key={id}
              nodeId={id}
              path={`${path}${resource.id},`}
              predicate={predicate}
              relatedUri={resource.id}
            />
          )
        })}
      {(c_in || c_out) && !resource.predicates && <CircularProgress />}
    </TreeItem>
  ) : (
    "🐌"
  )
}

function getNumberOfChildren(resource) {
  if (resource && resource.identity.length) {
    return resource.identity.find(child => child.c).c
  }
  return { value: 0 }
}

function canShowItem(resource, unfoldedPaths, path) {
  return resource && (unfoldedPaths.includes(path) || !path)
}

export default IriTreeItem
