import { useParams } from 'react-router-dom'
import { SERVICE_BASE_URI } from '../../../sherlock'
import ResourceBase from './ResourceCommon'

export default () => {
  const { path } = useParams()
  const resourceUri = 'http://data-iremus.huma-num.fr/ns/' + path
  const serviceUriId = SERVICE_BASE_URI() + 'ns/' + path
  const serviceUriDi = SERVICE_BASE_URI() + 'sn/' + path

  return ResourceBase({ resourceUri, serviceUriId, serviceUriDi })
}
