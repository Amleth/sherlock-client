import React, { useEffect, useState } from 'react'

const tk = new window.verovio.toolkit()

function C() {
  const [score, setScore] = useState(null)

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Amleth/SHERLOCK/master/files/787.mei',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
      },
    )
      .then(res => res.text())
      .then(res => {
        setScore(
          tk.renderData(
            res,
            // , {
            // adjustPageHeight: true,
            // ignoreLayout: 1,
            // pageHeight: 60000,
            //}
          ),
        )
      })

    return () => {}
  }, [])

  return (
    <>
      <div>MEI</div>
      <div className='verovio' dangerouslySetInnerHTML={{ __html: score }} />
    </>
  )
}

export default C
