import {reactive} from 'vue'

export class CopyrightOverlay {
    constructor(overlayEnabled, overlayPosition, overlayScale, overlayTitle, overlaySubtitle) {
        this.enabled = overlayEnabled
        this.position = overlayPosition
        this.scale = overlayScale
        this.title = overlayTitle
        this.subtitle = overlaySubtitle
    }
}

export default function useCopyrightOverlay() {
    const overlayEnabled = true
    const overlayPosition = 'left: calc(100vw - 116px - 5px); top: calc(100vh - 58px - 5px);'
    const overlayScale = 1
    const overlayTitle = 'Ambient IoT'
    const overlaySubtitle = 'by '

    const copyrightOverlay = reactive(new CopyrightOverlay(
        overlayEnabled,
        overlayPosition,
        overlayScale,
        overlayTitle,
        overlaySubtitle,
    ))

    return {copyrightOverlay}
}

