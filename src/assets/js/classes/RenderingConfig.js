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
            description: 'rec, non-transp, high perf',
            enabled: false,
        },
        //{
        //    name: VIDEO,
        //    description: 'rec, transp, very low perf',
        //    enabled: false,
        //},
        {
            name: WEBGL,
            description: 'todo, realtime, transp, highest perf',
            enabled: false,
        },
    ],
}
