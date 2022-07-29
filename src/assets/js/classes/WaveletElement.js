import DisplayElement from "@/assets/js/classes/DisplayElement";
export default class WaveletElement extends DisplayElement {
    constructor() {
        super();

        this.type = 'wavelet'
        this.color = 'rgb(255,255,255)'
        this.options = {
            fadein: false,
            fadeout: false,
        }
    }
}
