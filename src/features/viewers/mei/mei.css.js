import { css } from '@emotion/react'

export const COLOR_FOCUS = 'turquoise'

export const annotationsPanelStyle = css`
  border-left: 1px solid black;
  height: 100vh;
  overflow-y: scroll;
  position: fixed;
  right: 0;
  width: 34%;
  
  .basket {
    display: flex;
    overflow: auto;
  }
`

export const containerStyle = css`
  background-color: white;
  color: black;
  display: flex;

  @keyframes condemed_blink_effect {
    0% { color: aqua; }
    100% { color: black; }
  }  
`

export const mainAreaStyle = css`
  width: 66%;
`

export const modeSelectorStyle = css`
  border-bottom: 1px solid black;
`

export const verovioStyle = css`
  min-height: 100vh;

  .vrv-ui-toolbar {
    font-family: monospace;
  }

  .hovered {
    color: ${COLOR_FOCUS};
  }

  g.selected {
    color: ${COLOR_FOCUS};
  }

  g.focused {
    animation: 0.3s linear infinite condemed_blink_effect;
  }
`