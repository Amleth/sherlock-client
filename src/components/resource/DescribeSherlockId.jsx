import { useParams } from 'react-router-dom'
import Resource from './Resource'

const C = () => {
  const { id } = useParams()

  return <Resource resourceUri={'http://data-iremus.huma-num.fr/id/' + id} />
}

export default C
