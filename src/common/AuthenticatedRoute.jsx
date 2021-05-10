import { Route, Redirect } from 'react-router-dom'
import {useSelector} from "react-redux";

const AuthenticatedRoute = ({component: Component, ...rest}) => {
  const user = useSelector(state => state.user)
  return (
    <Route {...rest} render={(props) =>
      (
        user.token
          ? <Component {...props} />
          : <Redirect to='/login'/>
      )}/>
  )
}

export default AuthenticatedRoute;