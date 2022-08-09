<template>
  <div id="pixi-container"></div>
</template>

<script setup>
// eslint-disable-next-line
import * as PIXI from 'pixi.js'
// eslint-disable-next-line
import {defineProps, onMounted, reactive, ref, watch} from "vue";


// eslint-disable-next-line
const props = defineProps({
  wavelets: Map,
  id_map: Map,
})


const pixi = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  //backgroundAlpha: true,
  backgroundColor: '0x0000FF',
  //view: canvas,
})

const container = new PIXI.Container();
// Move container to the center
container.x = pixi.screen.width / 2;
container.y = pixi.screen.height / 2;

// Center wavelet sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
pixi.stage.addChild(container);

console.log(pixi)


// eslint-disable-next-line
const waveletsList = reactive(props.wavelets)

watch(waveletsList, (updatedWaveletsList) => {
  console.log('watch triggered')
  updatedWaveletsList.forEach((wavelet) => {
    drawWavelet(wavelet)
  })
})

onMounted(() => {
  const canvas = document.getElementById('pixi-container')
  canvas.appendChild(pixi.view)
  ticks()
})

// eslint-disable-next-line
function drawWavelet(wavelet) {
  console.log('drawWavelet triggered')

    // Create a new texture
    const texture = PIXI.Texture.from("static/img/logo.png")
    const sprite = new PIXI.Sprite(texture)
    sprite.anchor.set(0.5)
    sprite.x = wavelet.x
    sprite.y = wavelet.y

    container.addChild(sprite);
}

function ticks() {
  // Listen for animate update
  pixi.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
  });
}

</script>

<style lang="sass" scoped>
#pixi-container
  width: 100vw
  height: 100vh
</style>