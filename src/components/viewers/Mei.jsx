import React, { useEffect } from 'react'
import verovio from 'verovio'

const tk = new verovio.toolkit()

function C() {
  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/Amleth/SHERLOCK/master/files/787.mei',
    ).then(res => {
      console.log(res)
    })
    return () => {}
  }, [])

  return (
    <>
      <div>MEI</div>
      <pre></pre>
    </>
  )
}

export default C
