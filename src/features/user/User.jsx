import {useDispatch, useSelector} from "react-redux";
import {userDisconnected} from "./userSlice";
import Button from "@material-ui/core/Button";
import {testPostResource} from "../../common/backend";
import {useState} from "react";

export const User = () => {
  const [resource, setResource] = useState(null);
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
      {user.access_token}
      <br/>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          setResource(await testPostResource(user.access_token, user.refresh_token, dispatch))
        }}>test post resource
      </Button>
      <pre>
        {JSON.stringify(resource, null, 4)}
      </pre>
    </div>

  )
}
