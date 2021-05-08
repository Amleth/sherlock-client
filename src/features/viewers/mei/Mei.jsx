/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createVerovio, getNodeNote, prout } from './verovioHelpers'
import { annotationsPanelStyle, containerStyle, mainAreaStyle, verovioStyle } from './mei.css'
import Basket from './Basket'
import ModeSelector from './ModeSelector'

window.verovioCallback = prout

export const VIEW_STATE_READING = 'reading'
export const VIEW_STATE_PICKING = 'picking'

const Mei = () => {
  const { id } = useParams()
  const meiUri = process.env.REACT_APP_SHERLOCK_FILES_URI + 'mei/' + id + '_sherlockized.mei'

  const [basket, setBasket] = useState({})
  const [viewState, setViewState] = useState(VIEW_STATE_READING)

  useEffect(() => {
    createVerovio(meiUri) // github.com/rism-digital/verovio-app-react/blob/master/src/App.js
  }, [meiUri])

  const handleMouseOver = e => {
    const n = getNodeNote(e)
    if (n) {
      n.noteNode.classList.add('hovered')
    }
  }

  const handleMouseLeave = e => {
    const n = getNodeNote(e)
    if (n) {
      n.noteNode.classList.remove('hovered')
    }
  }

  const handleClick = e => {
    const n = getNodeNote(e)
    if (n && viewState === VIEW_STATE_PICKING) {
      document.getElementById(n.noteNode.id).classList.add('selected')
      setBasket({ ...basket, [n.noteNode.id]: n })
    }
  }

  const removeFromBasket = n => {
    const b = { ...basket }
    delete b[n.noteNode.id]
    document.getElementById(n.noteNode.id) && document.getElementById(n.noteNode.id).classList.remove('selected')
    document.getElementById(n.noteNode.id) && document.getElementById(n.noteNode.id).classList.remove('focused')
    setBasket(b)
  }

  return (
    <div
      css={containerStyle}
      onMouseEnter={() =>
        Object.keys(basket).forEach(
          _ => document.getElementById(_) && document.getElementById(_).classList.add('selected')
        )
      }
    >
      <div css={mainAreaStyle}>
        <div
          css={verovioStyle}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseLeave}
          id="verovio_container"
        />
      </div>
      <div css={annotationsPanelStyle}>
        <ModeSelector setViewState={setViewState} viewState={viewState} />
        <Basket className="basket" data={basket} removeFromBasket={removeFromBasket} />
      </div>
    </div>
  )
}

export default Mei
