/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import useScript from '../../../common/useScript'

// https://www.verovio.org/javascript.xhtml
// https://www.verovio.org/mei-viewer.xhtml
// https://betterprogramming.pub/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668

function C() {
  const query = new URLSearchParams(useLocation().search)
  const mei_uri = query.get('mei_uri')

  const [score, setScore] = useState(null)

  const { verovio } = useScript('https://www.verovio.org/javascript/develop/verovio-toolkit.js', 'verovio')
  if (verovio && !score) {
    const tk = new window.verovio.toolkit()

    fetch(mei_uri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
    })
      .then(res => res.text())
      .then(res => {
        const { innerHeight, innerWidth } = window
        console.log(innerHeight, innerWidth)

        setScore(
          tk.renderData(res, {
            svgHtml5: true,
            svgViewBox: true,
          })
        )
      })
  }

  return (
    <>
      <header>
        <div>{query.get('sherlock_uri')}</div>
        <div>{query.get('mei_uri')}</div>
      </header>
      <div
        css={css`
          background-color: white;
        `}
        className="verovio"
        dangerouslySetInnerHTML={{ __html: score }}
      />
    </>
  )
}

export default C
