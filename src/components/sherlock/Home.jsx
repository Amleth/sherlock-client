import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div
      className={css`
        margin: auto;
        max-width: 800px;
      `}
    >
      {/* {makeHex(69, 0, 0, 'DarkTurquoise')} */}
      <ul>
        <li>
          <Link to="/about">À propos</Link>
        </li>
        {/* <li>
          <Link to='/meiscores'>MEI Scores</Link>
        </li> */}
        {/* <li>
          <Link to='/skosconceptschemes'>SKOS ConceptSchemes</Link>
        </li> */}
        <li>
          <Link to="/yasgui">Yasgui</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home
