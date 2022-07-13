<template>
  <div class="display">
    <!-- Wavelets to display -->
    <template v-for="[key, wavelet] in wavelets" :key="key">
      <div :class="(transparentMode ? 'trwavelet' : 'wavelet') + ' t-' + wavelet.data.value" :style="'left:' + wavelet.x + 'px; top:' + wavelet.y + 'px;'">
        <span :class="transparentMode ? 'trwavelet__value' : 'wavelet__value'" :style="`color: ${wavelet.color}`">{{ wavelet.data.value ? wavelet.data.value : '-' }}°</span>
        <div v-if="!transparentMode && isColorWavelets" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
        <div class="circles" v-if="transparentMode">
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
          <div class="circle_pulse" :style="isColorWavelets ? `border-color: ${wavelet.color}` : ''"></div>
        </div>
      </div>
    </template>

    <!-- Grid mode -->
    <template v-if="gridMode">
      <template v-for="[key, map] in id_map" :key="key">
        <div :class="(transparentMode ? 'trwavelet trwavelet_eternal' : 'wavelet wavelet_eternal')" :style="'left:' + map.x + 'px; top:' + map.y + 'px;'">
          <div class="circles" v-if="transparentMode">
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
            <div class="circle_pulse"></div>
          </div>
        </div>
      </template>
    </template>

    <div class="ui-wrapper mb-3">
      <div class="ui-container-toggle" :style="id_map.size == 0 ? 'display: block !important;' : ''">
        <!-- Connection status -->
        <div class="connection-status mb-3" :class="connectionStatus"
             :style="'background-color:' + connectionStatus + '; opacity: ' + (connectionState ? 1 : .3) + ';'"></div>
        <!--CSV upload-->
        <div class="mb-3">
          <label for="map-file-upload" class="form-label small"><span class="text-white-50">Upload map CSV</span>
            (<span
                :style="id_map.size == 0 ? 'color: red' : 'color: green'"> {{ id_map.size }} ids loaded</span>)</label>
          <input class="form-control form-control-sm" id="map-file-upload" type="file" @change="openFile">
        </div>
        <!--Grid look switch-->
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="gridMode" id="grid-checkbox">
          <label class="form-check-label" for="grid-checkbox" style="color: white">
            Grid mode
          </label>
        </div>
        <!--Simulate wavelets switch-->
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="simulationMode" id="sim-checkbox" @change="simulationSwitched">
          <label class="form-check-label" for="sim-checkbox" style="color: white">
            Enable simulation
          </label>
        </div>
        <!--Coloring wavelets-->
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="isColorWavelets" id="color-wavelets-checkbox">
          <label class="form-check-label" for="color-wavelets-checkbox" style="color: white">
            Color wavelets
          </label>
        </div>
        <hr>

        <!--Transparent wavelets switch-->
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="transparentMode" id="tr-checkbox">
          <label class="form-check-label" for="tr-checkbox" style="color: white">
            Transparent <sup class="text-warning fw-lighter">higher load</sup>
          </label>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const wavelets = ref(new Map())
const id_map = ref(new Map())
const gridMode = ref(false)
const transparentMode = ref(false)

import mqttclient from "@/assets/js/mqttclient";
import MessageParser from "@/assets/js/classes/MessageParser";
import WaveletElement from "@/assets/js/classes/WaveletElement";

// eslint-disable-next-line
function connect() {
  mqttclient.createConnection(render, renderConnection)
  mqttclient.doSubscribe()
}

function disconnect() {
  mqttclient.doUnSubscribe()
  mqttclient.destroyConnection()
}

import {rgbColor} from "@/assets/js/helpers/temperaturecolor"
function render(message) {
  if (gridMode.value === true) {
    return false
  }
  // Create new wavelet element
  const wavelet = new WaveletElement();
  if (typeof message == 'string') {
    // Get event data
    const event = MessageParser.extract(message)
    if (event) {
      wavelet.data = event
      const color = rgbColor(wavelet.data.value)
      wavelet.color = `rgb(${color[0]},${color[1]},${color[2]})`
    }
    // Get element coordinates
    const coordinates = id_map.value.get(wavelet.data.tag)
    if (coordinates) {
      console.log('Tag ' + wavelet.data.tag + ' is in map. Render.');
      wavelet.inject(coordinates)
      wavelets.value.set(wavelet.data.tag, wavelet)
    } else {
      console.log('Tag ' + wavelet.data.tag + ' is not in map!');
    }
  }
}

function openFile(event) {
  let input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
    id_map.value = MessageParser.coordinates(reader.result)
    console.log('Uploaded CSV:');
    console.log(reader.result.substring(0, 200));
  };

  reader.readAsText(input.files[0]);
}

// eslint-disable-next-line
const simulationMode = ref(false)
onMounted(() => {
  if (simulationMode.value === true) {
    connectionStatus.value = 'green'
    runSimulation()
  } else {
    connectionStatus.value = 'red'
    connect()
  }
  clearOld()
  id_map.value = MessageParser.coordinates()
})

function simulationSwitched() {
  if (simulationMode.value === true) {
    disconnect()
    connectionStatus.value = 'green'
    runSimulation()
  } else {
    connectionStatus.value = 'red'
    connect()
  }
}

const connectionState = ref(true)
const connectionStatus = ref('red')

function renderConnection(status) {
  connectionState.value = !connectionState.value
  connectionStatus.value = status
}

function generateMessage() {
  //events,tagId=(01)00850027865010(21)00oeT4035,eventName=TEMP_C,eventValue=15.53504436835706,timestamp=1655924635
  const min = 4000
  const max = 5026
  const min_t = 15
  const max_t = 27
  const tag = '(01)00850027865010(21)00oeT' + (Math.floor(Math.random() * (max - min) + min)).toString()
  const value = (Math.random() * (max_t - min_t) + min_t).toFixed(4)
  let message = 'events,tagId=' + tag + ',eventName=TEMP_C,eventValue=' + value + ',timestamp=' + Date.now()
  return message
}

function runSimulation() {
  if (simulationMode.value === false) {
    return false
  }
  connectionState.value = !connectionState.value
  //const obj = generateObject()
  //wavelets.value.set(obj.data.tag, obj)
  const message = generateMessage()
  render(message)
  setTimeout(runSimulation, Math.floor(Math.random() * 10) + 1)
}

function clearOld() {
  const lifetime = 9
  const now = Date.now()
  wavelets.value.forEach((wavelet) => {
    const seconds = Math.floor((now - wavelet.created) / 1000)
    if (seconds >= lifetime) {
      console.log('Lifetime exceeded ' + lifetime + 's for #' + wavelet.id)
      wavelets.value.delete(wavelet.data.tag)
    }
  })
  setTimeout(clearOld, 500)
}

const isColorWavelets = ref(false)

</script>

<style scoped lang="sass">
.display
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  background-color: #000
  overflow: hidden


.wavelet
  background-image: url('@/assets/wavelet-anim.svg')
  background-size: contain
  background-position: center
  position: absolute
  width: 128px
  height: 128px
  //transform: translate(-30px, -30px)
  //-moz-animation: hidingAnimation .4s ease-in 9s forwards
  //-webkit-animation: hidingAnimation .4s ease-in 9s forwards
  //-o-animation: hidingAnimation .4s ease-in 9s forwards
  //animation: hidingAnimation .4s ease-in 9s forwards
  //-webkit-animation-fill-mode: forwards
  //animation-fill-mode: forwards

  &_eternal
    -moz-animation: none
    -webkit-animation: none
    -o-animation: none
    animation: none
    -webkit-animation-fill-mode: none
    animation-fill-mode: none

  &__value
    color: rgba(255, 255, 255, 1)
    background-color: black
    display: inline-block
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 20px
    font-size: 12px
    font-weight: 900
    padding: 0 4px
    text-align: center
    border-radius: 6px
    z-index: 110

.trwavelet
  position: absolute
  width: 128px
  height: 128px
  //-moz-animation: hidingAnimation .4s ease-in 9s forwards
  //-webkit-animation: hidingAnimation .4s ease-in 9s forwards
  //-o-animation: hidingAnimation .4s ease-in 9s forwards
  //animation: hidingAnimation .4s ease-in 9s forwards
  //-webkit-animation-fill-mode: forwards
  //animation-fill-mode: forwards

  &_eternal
    -moz-animation: none
    -webkit-animation: none
    -o-animation: none
    animation: none
    -webkit-animation-fill-mode: none
    animation-fill-mode: none

  &__value
    color: rgba(255, 255, 255, .9)
    background-color: black
    display: inline-block
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 20px
    font-size: 12px
    font-weight: 900
    padding: 0 4px
    text-align: center
    border-radius: 6px
    z-index: 110

  .circles
    position: absolute
    width: 128px
    height: 128px
    left: 0
    top: 0
    z-index: 100

  .circle_pulse
    -webkit-animation: pulse 2.8s infinite
    animation: pulse 2.8s infinite
    border: 1px solid white
    width: 64px
    height: 64px
    top: 32px
    left: 32px
    position: absolute
    transform: translate3d(0,0,0)
    transform-origin: center center
    margin: 0 auto
    border-radius: 100%
    opacity: 0
    z-index: -1
    box-shadow: inset 0 0 0 0 #000
    .trwavelet_eternal &
      -moz-animation: none
      -webkit-animation: none
      -o-animation: none
      animation: none
      -webkit-animation-fill-mode: none
      animation-fill-mode: none

  .circle_pulse:nth-child(2)
    -webkit-animation-delay: .4s
    animation-delay: .4s

  .circle_pulse:nth-child(3)
    -webkit-animation-delay: .8s
    animation-delay: .8s

  .circle_pulse:nth-child(4)
    -webkit-animation-delay: 1.2s
    animation-delay: 1.2s

  .circle_pulse:nth-child(5)
    -webkit-animation-delay: 1.6s
    animation-delay: 1.6s

  .circle_pulse:nth-child(6)
    -webkit-animation-delay: 2s
    animation-delay: 2s

  .circle_pulse:nth-child(7)
    -webkit-animation-delay: 2.4s
    animation-delay: 2.4s

  .circle_pulse:nth-child(8)
    -webkit-animation-delay: 2.8s
    animation-delay: 2.8s

@-webkit-keyframes pulse
  0%
    transform: scale(.9)
    opacity: .1
  20%
    opacity: 1
  100%
    transform: scale(2)
    opacity: 0
    box-shadow: inset 0 0 1px 1px #000

@keyframes pulse
  0%
    transform: scale(.9)
    opacity: .1
  20%
    opacity: 1
  100%
    transform: scale(2)
    opacity: 0
    box-shadow: inset 0 0 1px 1px #000


@-webkit-keyframes hidingAnimation
  from
    opacity: 1
  to
    opacity: 0

@keyframes hidingAnimation
  from
    opacity: 1
  to
    opacity: 0


.ui-wrapper
  position: absolute
  top: 0
  left: 0
  width: 260px
  min-height: 200px
  opacity: 1
  transform: scale(.9)

  & > div
    display: none

  &:hover > div
    display: block

.connection-status
  border-radius: 5px
  width: 10px
  height: 10px


.wavelet-coloring
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  mix-blend-mode: multiply
</style>
