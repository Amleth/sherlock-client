/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { userDisconnected } from './userSlice'
import Button from '@material-ui/core/Button'
// import { postE13 } from '../../common/backend'
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { stringAvatar } from '../../common/utils'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom'

export const User = () => {
  const user = useSelector(state => state.user)
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <Paper
        align="center"
        variant="outlined"
        css={css`
          width: 75%;
          margin: 5vh auto;
        `}
      >
        <Avatar
          css={css`
            margin-top: 2vh;
          `}
          {...stringAvatar(user.username)}
        />
        <Typography mt={2} variant="h3">
          {user.username}
        </Typography>
        <Typography mt={3} variant="h5">
          Liste des contributions
        </Typography>
        <a onClick={() => history.push('/id/15a7874f-4208-4ae4-bf9a-79488757f47a')}>uri 1</a>
        <br />
        <a onClick={() => history.push('/id/15a7874f-4208-4ae4-bf9a-79488757f47a')}>uri 2</a>
        <br />
        <a onClick={() => history.push('/id/15a7874f-4208-4ae4-bf9a-79488757f47a')}>uri 3</a>
        <br />
        <Button
          css={css`
            margin-top: 5vh;
          `}
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(userDisconnected())
          }}
        >
          Déconnexion
        </Button>
      </Paper>
    </React.Fragment>
  )
}
