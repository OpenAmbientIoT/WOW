import * as PIXI from "pixi.js";
import {WEBGL} from "@/assets/js/classes/RenderingConfig";


// Pixi / Canvas/ WebGL 2
export const pixi = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    backgroundAlpha: true,
    //autoDensity: true,
    //backgroundColor: '0x000000',
})

// Common rendering container
export const container = new PIXI.Container();
container.x = 0;
container.y = 0;
container.width = window.innerWidth
container.height = window.innerHeight
container.pivot.x = 0;
container.pivot.y = 0;
pixi.stage.addChild(container);

// eslint-disable-next-line
//const texture = PIXI.Texture.from("static/img/logo128.png")
// eslint-disable-next-line
export function ticks(selectedRenderingType) {
    // Listen for animate update
    pixi.ticker.add(() => { //delta
        if (selectedRenderingType.value == WEBGL) {
            // eslint-disable-next-line
            container.children.forEach((waveletContainer) => {
                //waveletContainer.alpha > .8 ? waveletContainer.alpha -= .01 : null
                if (waveletContainer.wavelet.options.fadein) {
                    waveletContainer.alpha < 1 ? waveletContainer.alpha += .03 : null
                }
                if (waveletContainer.wavelet.options.fadeout) {
                    waveletContainer.alpha > 0 ? waveletContainer.alpha -= .03 : null
                }
                // Calculate circles
                // eslint-disable-next-line
                waveletContainer.children.forEach((circle) => {
                    // Fadein circle
                    if (circle.scale.x < 0.3) {
                        circle.alpha < 1 ? circle.alpha += .02 : null
                    }
                    // Fadeout circle
                    if (circle.scale.x > 0.8) {
                        circle.alpha -= .01
                    }
                    // Scale circle
                    circle.scale.x < 1 ? circle.scale.set(circle.scale.x + .025, circle.scale.y + .025) : null
                })
            })
        }

    });
}

export function drawWavelet(wavelet, basicSize) {
    // Create wavelet container
    const waveletContainer = new PIXI.Container()
    waveletContainer.width = basicSize.value
    waveletContainer.height = basicSize.value
    waveletContainer.x = wavelet.x
    waveletContainer.y = wavelet.y
    waveletContainer.pivot.x = waveletContainer.width / 2
    waveletContainer.pivot.y = waveletContainer.height / 2
    // Attach wavelet obj
    waveletContainer.wavelet = wavelet
    waveletContainer.alpha = 0
    //waveletContainer.toGlobal(new PIXI.Point(0,0))

    //const sprite = new PIXI.Sprite(texture)
    //sprite.width = basicSize.value
    //sprite.height = basicSize.value
    //waveletContainer.addChild(sprite)

    // Wavelet inner circles
    // #1
    let circle = new PIXI.Graphics();
    circle.lineStyle(3, 0xffffff, 1)
    //circle.beginFill(0xDBE5DC);
    circle.drawCircle(0, 0, basicSize.value * 0.1)
    //circle.endFill()
    //circle.maxSegments = 12
    //circle.maxLength = 5
    //circle.adaptive = true
    //circle.nativeLines = true
    circle.pivot.x = waveletContainer.width / 2
    circle.pivot.y = waveletContainer.height / 2
    circle.position.set(waveletContainer.width / 2, waveletContainer.height / 2)
    //circle.toGlobal(new PIXI.Point(0,0))
    circle.scale.set(.1, .1)
    waveletContainer.addChild(circle)


    // Todo Add value and shine if temperature


    container.addChild(waveletContainer)
}
