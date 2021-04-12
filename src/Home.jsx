/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { parse } from 'uuid'

const Home = () => {
  const history = useHistory()
  const [uri, setUri] = useState('')

  return (
    <div
      css={css`
        text-align: center;
        padding: 0 40px;
        width: 100%;
      `}
    >
      <h1>SHERLOCK</h1>
      <section
        css={css`
          width: 100%;
        `}
      >
        <div>Naviguer vers une ressource</div>
        <div
          css={css`
            display: flex;
            width: 100%;
          `}
        >
          <input
            css={css`
              font-family: 'Fira Code';
              font-size: 82%;
              width: 100%;
            `}
            onChange={(e) => {
              setUri(e.target.value)
            }}
            value={uri}
          />
          <span
            css={css`
              width: 10px;
            `}
          />
          <button
            css={css`
              font-family: 'Fira Code';
              transition-duration: 0.5s;
              transition-property: background-color;
              width: 50px;
              &:hover {
                background-color: white;
                color: black;
                transition-duration: 0s;
                transition-property: background-color;
              }
            `}
            onClick={() => {
              uri && uri.startsWith('http') && history.push('/describe/' + encodeURIComponent(uri))
              uri && parse(uri) && history.push('/id/' + uri)
            }}
          >
            {`->`}
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
