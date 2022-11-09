import RenderingElement from "@/assets/js/classes/RenderingElement";
export default class WaveletElement extends RenderingElement {
    constructor() {
        super();

        this.type = 'wavelet'
        this.color = 'rgb(255,255,255)'

        this.options = {
            fadein: false,
            fadeout: false,
            ringsFadeout: false,
        }

        this.extension = {
            // packets contains timestamps of PACKET events to render separate ring peaks for each at once
            packets: new Set(),
        }
    }
}
