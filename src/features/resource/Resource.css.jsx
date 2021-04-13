/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const BAR_SIZE = 80
export const MARGIN = 80
const RESOURCE_MARGIN = '0.69em'
export const HEADER_HEIGHT = 35
const TABLE_BORDER_COLOUR = '#034'
const TREE_WIDTH = 300

export const root = css`
  display: flex;
  flex-direction: row;
`

export const tree = css`
  background-color: white;
  color: blue;
  height: 100vh;
  position: fixed;
  width: ${TREE_WIDTH}px;
`

export const bar = css`
  background-color: #222;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  right: 0;
`

export const resource = css`
    margin: 0 ${MARGIN + BAR_SIZE}px 0 ${TREE_WIDTH + MARGIN}px;
    margin-bottom: 111px;

    h1 {
        color: #ddd;
        font-size: 200%;
        font-weight: 300;
        height: ${BAR_SIZE}px;
        letter-spacing: 6px;
        margin: 0;
        padding: 0;
        padding-top: 30px;
        text-transform: uppercase;
    }

    h1 + div {
        border-top: 1px solid #666;
        font-family: var(--mono-font);
        font-size: 1em;
        height: ${BAR_SIZE}px;
        padding-top: 9px;
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
        color: #ddd;
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
        // border-left: none;
    }
    th:nth-of-type(3),
    td:nth-of-type(3) {
        // border-right: none;
        padding-right: 0;
        white-space: nowrap;
    }
    td {
        // border-bottom: 1px solid ${TABLE_BORDER_COLOUR};
        // border-top: 1px solid ${TABLE_BORDER_COLOUR};
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
        // padding-left: 20px;
    }
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
