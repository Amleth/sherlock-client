export const APP_MARGIN = 20
export const IN = '0s'
export const OUT = '0.5s'
export const TEXT_FONT = 'Alegreya'
export const MONO_FONT = 'Fira Code'
export const TEAL = '#1693A5'
export const COLOR_MI_TEAL = 'rgba(0, 169, 190, 1)' // #00A9BE
export const COLOR_MI_ORANGE = 'rgba(255, 132, 36, 1)' // #FF8424
export const COLOR_MI_MAGENTA = 'rgba(236, 1, 106, 1)' // #EC016A
export const COLOR_MI_YELLOW = 'rgba(235, 181, 37, 1)' // #EBB525

export const randomColor = () => Math.floor(Math.random() * 16777215).toString(16)

export const ITEM_MARGIN = 3

export const darken = (c, div) => {
    if (!c.startsWith('rgba(')) return c
    let _ = parseFloat(c.replace('rgba(', '').replace(' ', '').replace(')', '').split(',').slice(-1))
    c = c.replace(_ + ')', div * _ + ')')
    return c
}