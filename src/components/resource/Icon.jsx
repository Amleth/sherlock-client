/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { randomColor } from '../../style'
import { BAR_SIZE } from './Resource.css'

export const style = (backgroundColor) => css`
  background-color: ${backgroundColor || '#' + randomColor()};
  flex-direction: row;
  font-size: 33px;
  line-height: ${BAR_SIZE}px;
  height: 80px;
  text-align: center;
  transition: background-color 0.33s;
  user-select: none;
  width: ${BAR_SIZE}px;
  &:hover {
    background-color: white;
    color: black;
    text-decoration: underline;
    transition: background-color 0s;
  }
`

const C = ({ backgroundColor, children, onPress, text }) => {
  return (
    <div css={style(backgroundColor)} onClick={onPress}>
      {children}
    </div>
  )
}

export default C
