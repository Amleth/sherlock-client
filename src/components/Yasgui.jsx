import React, { useEffect } from 'react'
import Yasgui from '@triply/yasgui'
import '@triply/yasgui/build/yasgui.min.css'

function C() {
  useEffect(() => {
    new Yasgui(document.getElementById('yasgui'), {
      requestConfig: {
        endpoint: process.env.REACT_APP_SHEROCK_SPARQL_ENDPOINT,
        method: 'POST',
      },
      copyEndpointOnNewTab: false,
    })
    return () => {}
  }, [])

  return <div id='yasgui' />
}

export default C
