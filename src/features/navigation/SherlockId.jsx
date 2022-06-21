import { useParams } from 'react-router-dom'
import Resource from '../resource/Resource'

const C = () => {
  const { id, view } = useParams()

  return <Resource resourceUri={'http://data-iremus.huma-num.fr/id/' + id} view={view} />
}

export default C
