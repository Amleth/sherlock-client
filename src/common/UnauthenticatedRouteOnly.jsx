import { Route, Redirect } from 'react-router-dom'
import {useSelector} from "react-redux";

const UnauthenticatedRouteOnly = ({component: Component, ...rest}) => {
  const user = useSelector(state => state.user)
  return (
    <Route {...rest} render={(props) =>
      (
        user && user.access_token
          ? <Redirect to='/me'/>
          : <Component {...props} />
      )}/>
  )
}

export default UnauthenticatedRouteOnly;