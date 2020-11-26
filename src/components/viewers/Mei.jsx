// https://www.verovio.org/javascript.xhtml
// https://www.verovio.org/mei-viewer.xhtml

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const tk = new window.verovio.toolkit()

function C() {
  const query = new URLSearchParams(useLocation().search)

  const [score, setScore] = useState(null)

  useEffect(() => {
    fetch(query.get('mei_uri'), {
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

    return () => {}
  }, [])

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
