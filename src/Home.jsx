/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { parse } from 'uuid'
import { getTweetUserAndId } from './features/twitter/twitter'

const Home = () => {
  const history = useHistory()
  const [uri, setUri] = useState('https://twitter.com/tubbutec/status/1391311620786229248')

  return (
    <div
      css={css`
        text-align: center;
        padding: 0 40px;
        width: 100%;
      `}
    >
      <h1
        css={css`
          font-weight: 100;
          letter-spacing: 13px;
          margin: 123px 0;
        `}
      >
        SHERLOCK
      </h1>
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
            onChange={e => {
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
              if (uri) {
                if (uri.startsWith('https://twitter.com/')) {
                  const { userScreenName, statusId } = getTweetUserAndId(uri)
                  history.push(`/tweet/${userScreenName}/${statusId}`)
                } else if (uri.startsWith('http')) {
                  history.push('/describe/' + encodeURIComponent(uri))
                } else {
                  parse(uri) && history.push('/id/' + uri)
                }
              }
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
