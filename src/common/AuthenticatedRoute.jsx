import { Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector(state => state.user)
  return (
    <Route
      {...rest}
      render={props => (user && user.access_token ? <Component {...props} /> : <Navigate to="/login" />)}
    />
  )
}

export default AuthenticatedRoute
