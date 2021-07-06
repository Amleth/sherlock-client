/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export const DRAWER_WIDTH = '40%'
export const HEADER_HEIGHT = 35
const H_SHADOW_COLOR = 'darkturquoise'
export const MARGIN = '2vw'

export const codes = css`
  display: flex;
  > div {
    margin-left: 8px;
  }
`

export const drawerStyle = (theme) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.default,
    boxSizing: 'border-box',
    width: DRAWER_WIDTH,
  },
  '& .MuiPaper-root': {
    borderRight: '1px solid #033',
  },
})

export const h2 = css`
  color: ${H_SHADOW_COLOR};
  font-size: 140%;
  font-weight: 300;
  letter-spacing: 3px;
  line-height: ${HEADER_HEIGHT}px;
  margin: 0;
  padding: 0;
  text-shadow:
    0 0 5px ${H_SHADOW_COLOR},
    0 0 20px ${H_SHADOW_COLOR},
    0 0 40px ${H_SHADOW_COLOR},
    0 0 60px ${H_SHADOW_COLOR};
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

////////////////////////////////////////////////////////////////////////////////
// TRIPLES TABLE
////////////////////////////////////////////////////////////////////////////////

const RESOURCE_MARGIN = '0.69em'
const TABLE_BORDER_COLOUR = '#034'
export const triplesTableStyle = theme => css`
  //
  // SECTIONS
  //

  section + section {
    margin-top: 60px;
  }
  
  //
  // TABLEAUX
  //

  table {
    border-collapse: collapse;
    font-family: ${theme.typography.fontFamilyMonospaced};
    width: 100%;
  }

  th,
  td {
    vertical-align: top;
    word-break: keep-all;
  }
  th {
    color: ${TABLE_BORDER_COLOUR};
    font-family: ${theme.typography.fontFamily};
    font-style: italic;
    font-weight: bold;
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
    font-family: ${theme.typography.fontFamily};
  }
  .label-separator {
    color: lightgray;
  }
  .xml-lang {
    color: lightgray;
    position: relative;
    font-size: 0.8em;
    line-height: 1em;
    vertical-align: super;
  }
  .labels {
  }
`

// export const BAR_SIZE = 30
// export const HEADER_BOTTOM_PADDING = 10
// export const NAV_BORDER_COLOR = '#333'
// const TITLE_HEIGHT = 80
// const TOP_HEADER_HEIGHT = BAR_SIZE + TITLE_HEIGHT + HEADER_BOTTOM_PADDING + 10
// export const TREE_BORDER_COLOR = '#666'