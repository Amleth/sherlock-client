import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import { makeHex } from '../../style'

const Home = () => {
  return (
    <div
      className={css`
        margin: auto;
        max-width: 800px;
      `}>
      {/* {makeHex(69, 0, 0, 'DarkTurquoise')} */}
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {/* <li>
          <Link to='/meiscores'>MEI Scores</Link>
        </li> */}
        {/* <li>
          <Link to='/skosconceptschemes'>SKOS ConceptSchemes</Link>
        </li> */}
        <li>
          <Link to='/yasgui'>Yasgui</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
