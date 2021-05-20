import { useParams } from 'react-router-dom'
import Resource from '../resource/Resource'
import { TWEET } from '../../common/viewerSelector'

const C = () => {
  const { userScreenName, statusId } = useParams()

  return <Resource resourceUri={`https://twitter.com/${userScreenName}/status/${statusId}`} view={TWEET} />
}

export default C
