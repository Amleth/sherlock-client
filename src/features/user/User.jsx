import {useDispatch, useSelector} from "react-redux";
import {userDisconnected} from "./userSlice";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

export const User = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          dispatch(userDisconnected())
        }}>Déconnexion</Button>
      {user.token}
    </div>
  )
}
