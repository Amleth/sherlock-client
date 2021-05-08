import StyledTreeItem from './StyledTreeItem'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Public } from '@material-ui/icons'
import { getResourcePredicates, pathUnfoldStatusChanged, selectResourceByUri } from './treeSlice'
import CircularProgress from '@material-ui/core/CircularProgress'
import PredicateTreeItem from './PredicateTreeItem'
import { focusedResourceUriSet } from '../settings/settingsSlice'
import {formatUri} from "../../common/rdf";

const IriTreeItem = ({ path, uri }) => {
  const dispatch = useDispatch()
  const resource = useSelector(state => selectResourceByUri(state, uri))
  const unfoldedPaths = useSelector(state => state.tree.unfoldedPaths)
  const count = getNumberOfChildren(resource)
  return canShowItem(resource, unfoldedPaths, path) ? (
    <StyledTreeItem
      onIconClick={() => {
        dispatch(getResourcePredicates(resource.id))
        dispatch(pathUnfoldStatusChanged(`${path}${resource.id},`))
      }}
      onLabelClick={e => {
        e.preventDefault()
        dispatch(focusedResourceUriSet(resource.id))
      }}
      labelIcon={Public}
      labelInfo={count.value}
      labelText={formatUri(uri)}
      nodeId={`${path}${resource.id},`}
    >
      {resource.predicates &&
        resource.predicates.map(predicate => (
          <PredicateTreeItem
            key={`${path},${resource.id},${predicate.p.value}`}
            relatedUri={resource.id}
            path={`${path}${resource.id},`}
            predicate={predicate}
          />
        ))}
      {count && !resource.predicates && <CircularProgress />}
    </StyledTreeItem>
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
