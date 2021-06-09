/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {ListItem} from "@material-ui/core";
import {focusedResourceUriSet} from "../settings/settingsSlice";
import Box from "@material-ui/core/Box";
import PublicIcon from "@material-ui/icons/Public";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectResourceByUri} from "./treeSlice";
import {computeIdentity, formatUri} from "../../common/rdf";

const IriListItem = ({uri}) => {
  const resource = useSelector(state => selectResourceByUri(state, uri))
  const dispatch = useDispatch()
  return <ListItem css={css`
    padding-left: 2px;
    padding: 5px 0px 0px 0px;
      `}
                   onClick={() => {
                     dispatch(focusedResourceUriSet(uri))
                   }}
  >
    <Box mr={3}>
      <PublicIcon/>
    </Box>
    <div css={css`
    white-space: nowrap;
      `}>
      {`${computeIdentity(resource.identity)}   ${formatUri(uri)}`}
    </div>
  </ListItem>
}

export default IriListItem;