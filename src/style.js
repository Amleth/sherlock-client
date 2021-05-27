export const APP_MARGIN = 20
export const IN = '0s'
export const OUT = '0.5s'
export const TEXT_FONT = 'Alegreya'
export const MONO_FONT = 'Fira Code'
export const TEAL = '#1693A5'

export const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

export const ITEM_MARGIN = 3

export const darken = (c, div) => {
    if (!c.startsWith('rgba(')) return c
    let _ = parseFloat(c.replace('rgba(', '').replace(' ', '').replace(')', '').split(',').slice(-1))
    c = c.replace(_ + ')', div * _ + ')')
    return c
}