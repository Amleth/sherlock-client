import { css } from '@emotion/css'

const About = () => {
  return (
    <div className={css`margin: 3em auto; max-width: 666px;`}>
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
      We are <a href="https://www.iremus.cnrs.fr/" target="_blank" rel="noreferrer">IReMus</a>.
    </div>
  )
}

export default About