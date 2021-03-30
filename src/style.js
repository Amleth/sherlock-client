import { css } from '@emotion/css'
export const APP_MARGIN = 20
export const IN = '0s'
export const OUT = '0.5s'
export const TEXT_FONT = 'Alegreya'
export const MONO_FONT = 'Fira Code'
export const TEAL = '#1693A5'
export const COLOR_MI_TEAL = '#00A9BE'
export const COLOR_MI_ORANGE = '#FF8424'
export const COLOR_MI_MAGENTA = '#EC016A'
export const COLOR_MI_YELLOW = '#EBB525'

export const hex = (
  <div
    className={css`
      color: lightgray;
      margin-top: 1rem;
    `}>
    ⬡
  </div>
)

export const h1 = css`
  color: dimgray;
  font-weight: 300;
  letter-spacing: 7px;
  margin: ${2 * APP_MARGIN}px 0 ${APP_MARGIN}px 0;
  text-align: center;
`

export const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)