import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const UnauthenticatedRouteOnly = ({ component: Component, ...rest }) => {
  const { query } = useLocation()
  const user = useSelector(state => state.user)
  return (
    <Route
      {...rest}
      render={props =>
        user && user.access_token ? (
          <Navigate to={query && query.nextURL ? query.nextURL : '/me'} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default UnauthenticatedRouteOnly
