import { css } from '@emotion/react'

const About = () => {
  return (
    <div
      className={css`
        margin: 3em auto;
        max-width: 666px;
      `}
    >
      {/* <span role='img' aria-label='night'>
        🌆
      </span>
      <span role='img' aria-label='night'>
        🏙
      </span>
      <span role='img' aria-label='night'>
        🌃
      </span>
      <span role='img' aria-label='night'>
        🌌
      </span> */}
      Nous sommes l'
      <a href="https://www.iremus.cnrs.fr" target="_blank" rel="noreferrer">
        IReMus
      </a>{' '}
      🎵, UMR 8223{' '}
      <a href="http://www.cnrs.fr" target="_blank" rel="noreferrer">
        CNRS
      </a>
      .
      <br />
      SHERLOCK est financé par l'appel à projets Émergence 2019—2021 de{' '}
      <a href="https://www.sorbonne-universite.fr" target="_blank" rel="noreferrer">
        Sorbonne Université
      </a>
      .
    </div>
  )
}

export default About
