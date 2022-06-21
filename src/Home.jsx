/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parse } from 'uuid'
import { getTweetUserAndId } from './features/twitter/twitter'

const Home = () => {
  const history = useNavigate()
  const [uri, setUri] = useState('https://twitter.com/tubbutec/status/1391311620786229248')

  return (
    <Box align="center" margin={11}>
      <Typography component="h1" fontWeight="300" letterSpacing={11} mb={11} variant="h4">
        SHERLOCK
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          css={theme =>
            css`
              input {
                font-family: ${theme.typography.fontFamilyMonospaced};
              }
            `
          }
          fullWidth
          label="Naviguer vers une ressource"
          value={uri}
          onChange={e => {
            setUri(e.target.value)
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            if (uri) {
              if (uri.startsWith('https://twitter.com/')) {
                const { userScreenName, statusId } = getTweetUserAndId(uri)
                history.push(`/tweet/${userScreenName}/${statusId}`)
              } else if (uri.startsWith('http')) {
                history.push('/describe/' + encodeURIComponent(uri))
              } else {
                parse(uri) && history.push('/id/' + uri)
              }
            }
          }}
        >
          <ArrowForwardIosSharpIcon />
        </Button>
      </Box>
    </Box>
  )
}

export default Home
