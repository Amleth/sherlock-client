/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const BAR_SIZE = 30
const TITLE_HEIGHT = 80
const TOP_HEADER_HEIGHT = BAR_SIZE + TITLE_HEIGHT
const RESOURCE_MARGIN = '0.69em'
export const HEADER_HEIGHT = 35
const TABLE_BORDER_COLOUR = '#034'
export const TREE_BORDER_COLOR = '#666'
export const NAV_BORDER_COLOR = '#333'

export const root = css`
  display: flex;
  flex-direction: row;
`

export const resource = css`
  width: 100%;

  > header {
    background-color: black;
    height: ${TOP_HEADER_HEIGHT}px;
    position: fixed;

    h1 {
      align-items: center;
      color: white;
      display: flex;
      font-family: var(--mono-font);
      font-size: 1em;
      height: ${TITLE_HEIGHT}px;
      margin: 0;
      padding: 0 0 0 2vw;
    }

    nav {
      border-bottom: 1px solid ${NAV_BORDER_COLOR};
      border-top: 1px solid ${NAV_BORDER_COLOR};
      display: flex;
      flex-direction: line;
      width: 100%;
    }
  }

  > main {
    margin: calc(${TOP_HEADER_HEIGHT}px + 4vh) 2vw 4vh 2vw;
  }

  section + section {
    margin-top: 40px;
  }

  //
  // TABLEAU
  //

  table {
    border-collapse: collapse;
    font-family: var(--mono-font);
    width: 100%;
  }
  th,
  td {
    vertical-align: top;
    word-break: keep-all;
  }
  th {
    color: #999;
    font-family: Jost;
    font-weight: normal;
    letter-spacing: 3px;
    padding: ${RESOURCE_MARGIN};
    text-align: left;
    text-transform: lowercase;
  }
  th:nth-of-type(1) {
    padding: ${RESOURCE_MARGIN} ${RESOURCE_MARGIN} ${RESOURCE_MARGIN} 0;
  }
  td {
    padding: 0.11em ${RESOURCE_MARGIN};
  }
  td:nth-of-type(1) {
    padding: 0.11em ${RESOURCE_MARGIN} 0.11em 0;
  }
  td:nth-of-type(2) {
    width: 100%;
  }
  th:nth-of-type(1),
  td:nth-of-type(1) {
  }
  th:nth-of-type(3),
  td:nth-of-type(3) {
    padding-right: 0;
    white-space: nowrap;
  }
  td {
  }
  tbody tr {
    border-bottom: 1px solid ${TABLE_BORDER_COLOUR};
    border-top: 1px solid ${TABLE_BORDER_COLOUR};
  }

  //
  // CONTENU DES CELLULES
  //

  .textValue {
    color: #eee;
    font-family: var(--text-font);
  }
  .label-separator {
    color: lightgray;
  }
  .xml-lang {
    color: lightgray;
    font-family: var(--text-font);
    position: relative;
    font-size: 0.8em;
    line-height: 1em;
    vertical-align: super;
  }
  .labels {
  }
`

export const h2 = css`
  color: #ddd;
  font-size: 140%;
  font-weight: 300;
  letter-spacing: 3px;
  line-height: ${HEADER_HEIGHT}px;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
`

export const header = css`
  display: flex;
  margin-bottom: 10px;
  space-between: 10px;
  div {
    margin-right: 10px;
  }

  h2 {
    ${h2}
  }

  div {
    margin: auto 0;
  }
`

export const codes = css`
  display: flex;
  > div {
    margin-left: 8px;
  }
`
