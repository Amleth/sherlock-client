import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { formatUri, makeIdentityQueryFragment } from './common/rdf'
import { sparqlEndpoint } from './common/sparql'

const C = ({ location }) => {
  const { id } = useParams()
  const qp = queryString.parse(location.search)
  const count = parseInt(qp.count) ? true : false
  const lr = parseInt(qp.lr) ? true : false

  const Q = makeIdentityQueryFragment('http://data-iremus.huma-num.fr/id/' + id, lr, null, true, count)

  const [response, setResponse] = useState([])

  useEffect(() => {
    sparqlEndpoint(Q).then(response => {
      setResponse(response.results.bindings)
    })
  }, [])

  let headers = []
  if (response) {
    for (const [k, v] of Object.entries(response)) {
      headers.push(...Object.keys(v))
    }
  }
  headers = Array.from(new Set(headers))

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map(h => (
                <TableCell align="center" key={h} sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {response.map(r => (
              <TableRow key={Math.random()}>
                {headers.map(h => (
                  <TableCell key={Math.random()}>{r.hasOwnProperty(h) ? formatUri(r[h].value) : '🦕'}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <pre style={{ margin: 0 }}>{Q}</pre>
    </>
  )
}

export default C
