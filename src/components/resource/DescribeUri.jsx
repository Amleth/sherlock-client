import { useParams } from 'react-router-dom'
import Main from './Main'

const C = () => {
  const { uri } = useParams()

  return <Main resourceUri={uri} />
}

export default C