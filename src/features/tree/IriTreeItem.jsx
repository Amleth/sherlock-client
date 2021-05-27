import CircularProgress from '@material-ui/core/CircularProgress'
import { Public } from '@material-ui/icons'
import TreeItem from '@material-ui/lab/TreeItem'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getResourcePredicates, pathUnfoldStatusChanged, selectResourceByUri } from './treeSlice'
import SherlockTreeItemContent from './SherlockTreeItemContent'
import PredicateTreeItem from './PredicateTreeItem'
import { focusedResourceUriSet } from '../settings/settingsSlice'
import { formatUri } from '../../common/rdf'

const IriTreeItem = ({ nodeId, path, uri, ...props }) => {
  const dispatch = useDispatch()
  const resource = useSelector(state => selectResourceByUri(state, uri))
  const unfoldedPaths = useSelector(state => state.tree.unfoldedPaths)
  const count = getNumberOfChildren(resource)

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
        labelInfo: count.value,
        labelText: formatUri(uri),
      }}
      nodeId={nodeId}
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
      {count && !resource.predicates && <CircularProgress />}
    </TreeItem>
  ) : (
    <CircularProgress />
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
