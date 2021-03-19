import { useParams } from 'react-router-dom'
import Resource from './Resource'

const C = () => {
  const { uri } = useParams()

  return <Resource resourceUri={uri} />
}

export default C
