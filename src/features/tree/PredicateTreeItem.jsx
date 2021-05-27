import SherlockTreeItemContent from './SherlockTreeItemContent'
import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDispatch, useSelector } from 'react-redux'
import { getResourcesByPredicateAndLinkedResource, pathUnfoldStatusChanged } from './treeSlice'
import IriTreeItem from './IriTreeItem'
import LiteralTreeItem from './LiteralTreeItem'
import { formatUri } from '../../common/rdf'
import { maxResourceUnfoldable } from '../../common/utils'

const PredicateTreeItem = ({ nodeId, path, predicate, relatedUri }) => {
  const dispatch = useDispatch()
  const unfoldedPaths = useSelector(state => state.tree.unfoldedPaths)

  if (predicate.c) {
    // if (predicate.c.value > maxResourceUnfoldable) {
    //   return (
    //     <SherlockTreeItemContent
    //       onLabelClick={e => {
    //         e.preventDefault()
    //       }}
    //       labelIcon={computeLabelIcon(predicate)}
    //       labelInfo={predicate.c.value}
    //       labelText={formatUri(predicate.p.value)}
    //       nodeId={`${path}${predicate.p.value},${predicate.direction.value},`}
    //     />
    //   )
    // } else {
    return (
      <TreeItem
        ContentComponent={SherlockTreeItemContent}
        ContentProps={{
          labelIcon: computeLabelIcon(predicate),
          labelInfo: predicate.c.value,
          labelText: formatUri(predicate.p.value),
          onIconClick: () => {
            dispatch(pathUnfoldStatusChanged(`${path}${predicate.p.value},${predicate.direction.value},`))
            dispatch(getResourcesByPredicateAndLinkedResource({ p: predicate, uri: relatedUri }))
          },
          onLabelClick: e => {
            e.preventDefault()
          },
        }}
        // nodeId={`${path}${predicate.p.value},${predicate.direction.value},`}
        nodeId={nodeId}
      >
        {unfoldedPaths.includes(path) && predicate.resources ? (
          predicate.resources.map(resource => {
            const id = `${path}${predicate.p.value},${predicate.direction.value},${resource.r.value},`
            console.log('literal ?', resource.r.value, resource.r.type)
            console.log(JSON.stringify(predicate.resources))
            return resource.r.type === 'uri' ? (
              <IriTreeItem
                key={id}
                nodeId={id}
                path={`${path}${predicate.p.value},${predicate.direction.value},`}
                uri={resource.r.value}
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
        )}
      </TreeItem>
    )
    // }
  } else {
    return <div />
  }
}

function computeLabelIcon(predicate) {
  return predicate.direction.value === 'o' ? ArrowRight : ArrowLeft
}

export default PredicateTreeItem
