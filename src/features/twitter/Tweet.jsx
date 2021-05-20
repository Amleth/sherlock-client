/** @jsxImportSource @emotion/react */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTweet } from './tweetsSlice'

const C = ({ resourceUri }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTweet(resourceUri))
  }, [dispatch, resourceUri])

  const tweet = useSelector(state => state.outgoing.entities[resourceUri])

  return <pre>{JSON.stringify(tweet)}</pre>
}

export default C
