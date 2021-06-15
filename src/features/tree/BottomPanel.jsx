/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useDispatch, useSelector} from "react-redux";
import {selectAllResources, selectResourceByUri} from "./treeSlice";
import {FixedSizeList} from 'react-window'
import React, {useEffect, useState} from "react";
import {ListItem} from "@material-ui/core";
import {focusedResourceUriSet} from "../settings/settingsSlice";
import Box from "@material-ui/core/Box";
import PublicIcon from "@material-ui/icons/Public";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const BottomPanel = ({relatedResourceUri, predicateUri}) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [resources, setResources] = useState([]);
  const relatedResource = useSelector(state => selectResourceByUri(state, relatedResourceUri))
  const allResources = useSelector(state => selectAllResources(state));
  useEffect(() => {
    const predicate = relatedResource.predicates.find(predicate => predicate.p.value === predicateUri)
    if (predicate.resources) {
      const tempResources = predicate.resources.map(resource => resource.r.value);
      setResources(allResources.filter(resource => tempResources.includes(resource.id)));

    }
  }, [relatedResource]);
  const filteredResources = resources.filter(resource => resource.label.includes(filter));
  function renderRow(props) {
    const {index, style} = props

    const resource = filteredResources[index]
    const component = <ListItem css={css`
      padding-left: 2px;
      padding: 5px 0px 0px 0px;
    `}
      onClick={() => {
        dispatch(focusedResourceUriSet(resource.id))
      }}
    >
      <div css={css`white-space: nowrap;`}>
        {resource.label}
      </div>
    </ListItem>
    return (
      <ListItem button style={style} key={index}>
        {component}
      </ListItem>
    )
  }


  return filteredResources ?
    <Box css={css`
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    height:50vh;
            `}
    >
      <TextField
        fullWidth
        css={css`margin-bottom: 3vh;`}
        placeholder="filtrer"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredResources.length
        ? <FixedSizeList
        height={Math.min(20 * resources.length, 250)}
        itemSize={20}
        itemCount={filteredResources.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
        : <Typography align="center">🙈</Typography>
      }
    </Box> : <div/>
}

export default BottomPanel
