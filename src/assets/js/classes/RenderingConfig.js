export const SVG = 'SVG'
export const GIF = 'GIF'
export const VIDEO = 'VIDEO'
export const WEBGL = 'WEBGL'
export const renderingConfig = {
    types: [
        {
            name: SVG,
            description: 'real time, transp, low perf',
            enabled: true,
        },
        {
            name: GIF,
            description: 'recorded, non-transp, high perf',
            enabled: false,
        },
        {
            name: VIDEO,
            description: 'recorded, transparent, higher perf',
            enabled: false,
        },
        //{
        //    name: WEBGL,
        //    description: 'realtime, transparent, highest perf',
        //    enabled: false,
        //},
    ],
}
