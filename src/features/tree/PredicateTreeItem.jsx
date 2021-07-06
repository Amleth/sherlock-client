/** @jsxImportSource @emotion/react */
import SherlockTreeItemContent from './SherlockTreeItemContent'
import TreeItem from '@material-ui/lab/TreeItem'
import { ArrowLeft, ArrowRight, Visibility } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'

import TransitionComponent from './TransitionComponent'
import {
  bottomPanelDisplayedResourcesChanged,
  getResourcesByPredicateAndLinkedResource,
  pathUnfoldStatusChanged,
} from './treeSlice'
import IriTreeItem from './IriTreeItem'
import LiteralTreeItem from './LiteralTreeItem'
import { formatUri } from '../../common/rdf'
import { maxResourceUnfoldable } from '../../common/utils'

const PredicateTreeItem = ({ nodeId, path, predicate, relatedUri }) => {
  const dispatch = useDispatch()
  const unfoldedPaths = useSelector(state => state.tree.unfoldedPaths)
  const bottomPanelResources = useSelector(state => state.tree.bottomPanelResources)
  const highlightPredicate =
    bottomPanelResources.relatedUri === relatedUri && bottomPanelResources.p === predicate.p.value

  return (
    <TreeItem
      ContentComponent={SherlockTreeItemContent}
      expandIcon={predicate.c.value < maxResourceUnfoldable ? null : <Visibility />}
      collapseIcon={predicate.c.value < maxResourceUnfoldable ? null : <Visibility />}
      ContentProps={{
        highlightText: highlightPredicate,
        labelIcon: computeLabelIcon(predicate),
        labelInfo: predicate.c.value,
        labelText: formatUri(predicate.p.value),
        onIconClick: e => {
          if (predicate.c.value < maxResourceUnfoldable) {
            dispatch(
              getResourcesByPredicateAndLinkedResource({
                p: predicate,
                uri: relatedUri,
                countLinkedResourceChildren: true,
              })
            )
            dispatch(pathUnfoldStatusChanged(`${path}${predicate.p.value},${predicate.direction.value},`))
          } else {
            dispatch(
              getResourcesByPredicateAndLinkedResource({
                p: predicate,
                uri: relatedUri,
                countLinkedResourceChildren: false,
              })
            )
            dispatch(bottomPanelDisplayedResourcesChanged({ relatedUri, p: predicate.p.value }))
          }
        },
        onLabelClick: e => {
          e.preventDefault()
        },
      }}
      // nodeId={`${path}${predicate.p.value},${predicate.direction.value},`}
      nodeId={nodeId} //TODO c'est pas le même à cause de la virgule en début (path)
      TransitionComponent={TransitionComponent}
    >
      {unfoldedPaths.includes(path) && predicate.resources ? (
        predicate.c.value < maxResourceUnfoldable ? (
          predicate.resources.map(resource => {
            console.log(resource)
            const id = `${path}${predicate.p.value},${predicate.direction.value},${resource.value},`
            return resource.type === 'uri' ? (
              <IriTreeItem
                key={id}
                nodeId={id}
                path={`${path}${predicate.p.value},${predicate.direction.value},`}
                uri={resource.value}
              />
            ) : (
              <LiteralTreeItem
                key={id}
                nodeId={id}
                path={`${path}${predicate.p.value},${predicate.direction.value},`}
                literal={resource.r}
              />
            )
          })
        ) : (
          <div />
        )
      ) : (
        '⏳'
      )}
    </TreeItem>
  )
}

function computeLabelIcon(predicate) {
  return predicate.direction.value === 'o' ? ArrowRight : ArrowLeft
}

export default PredicateTreeItem
