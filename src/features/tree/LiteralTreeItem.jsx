import SherlockTreeItemContent from './SherlockTreeItemContent'
import React from 'react'
import { DateRange, Label } from '@material-ui/icons'
import type from './datatype'

const LiteralTreeItem = ({ path, literal }) => {
  return (
    <SherlockTreeItemContent key={path} nodeId={path} labelText={literal.value} labelIcon={computeLabelIcon(literal.datatype)} />
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
