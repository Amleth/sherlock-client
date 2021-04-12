import { useParams } from 'react-router-dom'
import Resource from './Resource'

const C = () => {
  const { uri, view } = useParams()

  return <Resource resourceUri={decodeURIComponent(uri)} view={view} />
}

export default C
