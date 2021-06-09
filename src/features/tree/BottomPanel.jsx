/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useDispatch, useSelector} from "react-redux";
import {selectResourceByUri} from "./treeSlice";
import {FixedSizeList} from 'react-window'
import React from "react";
import {ListItem} from "@material-ui/core";
import {focusedResourceUriSet} from "../settings/settingsSlice";
import Box from "@material-ui/core/Box";
import PublicIcon from "@material-ui/icons/Public";
import LiteralTreeItem from "./LiteralTreeItem";
import Typography from "@material-ui/core/Typography";
import {formatUri} from "../../common/rdf";
import TextField from "@material-ui/core/TextField";
import IriTreeItem from "./IriTreeItem";
import IriListItem from "./IriListItem";

const BottomPanel = ({bottomPanelResources}) => {
  const relatedResource = useSelector(state => selectResourceByUri(state, bottomPanelResources.relatedUri))
  let predicate = null;
  if (relatedResource) {
    predicate = relatedResource.predicates.find(predicate => predicate.p.value === bottomPanelResources.p)
  }
  function renderRow(props) {
    const {index, style} = props

    const resource = predicate.resources[index]
    const component =
      resource.r.type === 'uri' ? (
        <IriListItem uri={resource.r.value}/>
      ) : (<ListItem>
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
  }
  return predicate && predicate.resources ?
    <Box css={css`
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    height:50vh;
            `}
    >
      <TextField fullWidth css={css`
    margin-bottom: 3vh;
            `} placeholder="filtrer"/>
      <FixedSizeList
        height={Math.min(20 * predicate.c.value, 250)}
        itemSize={20}
        itemCount={predicate.c.value}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box> : <div/>
}

export default BottomPanel
