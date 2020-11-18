import { useLocation, useParams } from 'react-router-dom'
import { SERVICE_BASE_URI } from '../../sherlock'
import ResourceBase from './ResourceCommon'

const useQuery = () => new URLSearchParams(useLocation().search)

export default () => {
  const { id } = useParams()
  const query = useQuery()
  const uri = query.get('uri')
  let serviceUriId = id ? SERVICE_BASE_URI() + 'id/' + id : SERVICE_BASE_URI() + 'id?uri=' + uri
  let serviceUriDi = SERVICE_BASE_URI() + (id ? 'di/' + id : 'di?uri=' + uri)

  let resourceUri = ''
  if (!id && uri && !uri.startsWith('http'))
    resourceUri = 'http://data-iremus.huma-num.fr/id/' + uri
  else resourceUri = id ? 'http://data-iremus.huma-num.fr/id/' + id : uri

  return ResourceBase({ resourceUri, serviceUriId, serviceUriDi })
}
