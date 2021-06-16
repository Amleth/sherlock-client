/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Button from "@material-ui/core/Button";
import {postE13} from "../../../common/backend";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import SyncAltIcon from '@material-ui/icons/SyncAlt';

export const C = ({resourceUri}) => {

  const [resource, setResource] = useState(null);
  const [inputs, setInputs] = useState({
    p140: resourceUri,
    p177: "",
    p141: "",
    p141_type: "",
    isUriP140: true
  });
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const exchangeP140AndP141 = () => {
    if (inputs.isUriP140) inputs.p141_type = "uri"
    setInputs( inputs => ({...inputs, p140: inputs.p141, p141: inputs.p140, isUriP140: !inputs.isUriP140}))
  }

  return <React.Fragment>
    <Box display="flex" css={css`margin-bottom: 3vh;`}>
      <TextField
        fullWidth
        InputProps={{
          readOnly: inputs.isUriP140,
        }}
        label="p140_assigned_attribute_to"
        value={inputs.p140}
        onChange={(e) => setInputs(inputs => ({...inputs, p140: [e.target.value]}))}
      />
      <Box css={css`
        display: flex;
        justify-content: center;
        width: 20%;
        align-items: center; `}>
        <Button onClick={() => exchangeP140AndP141()}>
          <SyncAltIcon/>
        </Button>
      </Box>
      <TextField
        fullWidth
        variant="outlined"
        InputProps={{
          readOnly: !inputs.isUriP140,
        }}
        label="p141_assigned"
        value={inputs.p141}
        onChange={(e) => setInputs(inputs => ({...inputs, p141: [e.target.value]}))}
      />
    </Box>
    <Box display="flex">
      <FormControl fullWidth variant="filled" css={css`margin-bottom: 3vh; border: none`}>
        <InputLabel>p177_assigned_property_type</InputLabel>
        <Select
          value={inputs.p177}
          onChange={(e) => setInputs(inputs => ({...inputs, p177: [e.target.value]}))}
        >
          <MenuItem value={"http://purl.org/dc/terms/title"}>dcterms:title</MenuItem>
          <MenuItem value={"http://purl.org/dc/terms/Location"}>dcterms:location</MenuItem>
          <MenuItem value={"http://purl.org/dc/terms/references"}>dcterms:references</MenuItem>
        </Select>
      </FormControl>
      <Box css={css`width: 20%;`}/>
      <FormControl fullWidth variant="filled" css={css`margin-bottom: 3vh; border: none`}>
        <InputLabel>p141_type</InputLabel>
        <Select
          disabled={! inputs.isUriP140}
          value={inputs.p141_type}
          onChange={(e) => setInputs(inputs => ({...inputs, p141_type: [e.target.value]}))}
        >
          <MenuItem value={"literal"}>literal</MenuItem>
          <MenuItem value={"uri"}>uri</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        setResource(await postE13(
          inputs.p140,
          inputs.p141,
          inputs.p177,
          inputs.p141_type,
          user.access_token,
          user.refresh_token,
          dispatch))
      }}>test post resource
    </Button>
    {resource && <pre>
        {JSON.stringify(resource, null, 4)}
    </pre>}
  </React.Fragment>
}

export default C

