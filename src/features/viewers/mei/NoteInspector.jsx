/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
import { Box, Typography } from '@material-ui/core'
import { useGetNoteIdentityQuery } from '../../../services/mei'
import { Link } from 'react-router-dom'

const C = ({ noteIri }) => {
  const { data, error, isLoading } = useGetNoteIdentityQuery(noteIri)
  const uuid = noteIri.split('/id/')[1]
  console.log(noteIri, uuid)

  return (
    <Box>
      <Typography>
        <Link to={'/id/' + uuid}>{noteIri}</Link>
      </Typography>
    </Box>
  )
}

export default C
