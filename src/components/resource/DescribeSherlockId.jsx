import { useParams } from 'react-router-dom'
import Main from './Main'

const C = () => {
  const { id } = useParams()

  return <Main resourceUri={'http://data-iremus.huma-num.fr/id/' + id} />
}

export default C
