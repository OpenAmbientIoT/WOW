export const SVG = 'SVG'
export const GIF = 'GIF'
export const WEBGL = 'WEBGL'
export const renderingConfig = {
    types: [
        {
            name: SVG,
            description: 'transp, mid perf',
            enabled: true,
        },
        {
            name: WEBGL,
            description: 'dsbld, transp, higher perf, β',
            enabled: false,
        },
        {
            name: GIF,
            description: 'non-transp. high perf',
            enabled: false,
        },
    ],
}
