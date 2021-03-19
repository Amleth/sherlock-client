// https://www.verovio.org/javascript.xhtml
// https://www.verovio.org/mei-viewer.xhtml
// https://betterprogramming.pub/4-ways-of-adding-external-js-files-in-reactjs-823f85de3668

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function C() {
  const query = new URLSearchParams(useLocation().search)
  const mei_uri = query.get('mei_uri')

  const [score, setScore] = useState(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.verovio.org/javascript/develop/verovio-toolkit.js'
    script.async = true
    document.body.appendChild(script)

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
          }),
        )
      })

    return () => {
      document.body.removeChild(script)
    }
  }, [mei_uri])

  return (
    <>
      <div>MEI</div>
      <div>{query.get('sherlock_uri')}</div>
      <div>{query.get('mei_uri')}</div>
      <div className='verovio' dangerouslySetInnerHTML={{ __html: score }} />
    </>
  )
}

export default C
