import RenderingElement from "@/assets/js/classes/RenderingElement";
export default class WaveletElement extends RenderingElement {
    constructor() {
        super();

        this.type = 'wavelet'
        this.color = null

        this.options = {
            fadein: false,
            fadeout: false,
            ringsFadeout: false,
        }

        this.packets = {
            // Stack contains timestamps of PACKET events to render separate ring peaks for each at once
            stack: new Set(),
            pulse: false,
            lastPulse: 0 // timestamp
        }

        this.proximity = {
            renderPackets: true,
            indicator: {
                positionShift: [0,0], // Shift position for proximity indicator (the spark in case with Walmart)
                size: 0,
            },
        }
    }
}
