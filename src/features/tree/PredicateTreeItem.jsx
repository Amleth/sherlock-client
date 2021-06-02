import SherlockTreeItemContent from './SherlockTreeItemContent'
import React from 'react'
import TreeItem from '@material-ui/lab/TreeItem'
import { CircularProgress, ListItem, ListItemText } from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { FixedSizeList } from 'react-window'

import TransitionComponent from './TransitionComponent'
import { getResourcesByPredicateAndLinkedResource, pathUnfoldStatusChanged } from './treeSlice'
import IriTreeItem from './IriTreeItem'
import LiteralTreeItem from './LiteralTreeItem'
import { formatUri } from '../../common/rdf'
// import { maxResourceUnfoldable } from '../../common/utils'

const PredicateTreeItem = ({ nodeId, path, predicate, relatedUri }) => {
  const dispatch = useDispatch()
  const unfoldedPaths = useSelector(state => state.tree.unfoldedPaths)

  function renderRow(props) {
    const { index, style } = props

    if (unfoldedPaths.includes(path) && predicate.resources) {
      const resource = predicate.resources[index]

      const id = `${path}${predicate.p.value},${predicate.direction.value},${resource.r.value},`
      const component =
        resource.r.type === 'uri' ? (
          <ListItem>
            <ListItemText primary={resource.r.value} />
          </ListItem>
        ) : (
          <ListItem>
            <LiteralTreeItem
              literal={resource.r}
            />
          </ListItem>
        )

      return (
        <ListItem button style={style} key={index}>
          {component}
        </ListItem>
      )
    } else return <div />
  }

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
      nodeId={nodeId} //TODO c'est pas le même à cause de la virgule en début (path)
      TransitionComponent={TransitionComponent}
    >
      {unfoldedPaths.includes(path) && predicate.resources ? (
        predicate.c.value < 123 ? (
          predicate.resources.map(resource => {
            const id = `${path}${predicate.p.value},${predicate.direction.value},${resource.r.value},`
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
          <FixedSizeList
            height={Math.min(20 * predicate.c.value, 400)}
            itemSize={20}
            itemCount={predicate.c.value}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
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
