<template>
  <div class="display" v-on:mousemove="updateCoordinates"
       :style="(gridMode && crosshairCursor ? 'cursor: crosshair;' : '') + (gridMode ? 'box-shadow: inset 0 0 0 2px wheat;' : '')">
    <!-- Wavelets to display -->
    <template v-for="[key, wavelet] in wavelets" :key="key">
      <div class="shine" :style="('left:' + (wavelet.x - waveletSize*1.5/2) + 'px; top:' + (wavelet.y - waveletSize*1.5/2) + 'px;')
           + ('width: ' + waveletSize*1.5 + 'px;' + 'height: ' + waveletSize*1.5 + 'px;')"></div>
      <div :class="'wavelet' + ' t-' + wavelet.data.value"
           :style="('left:' + (wavelet.x - waveletSize/2) + 'px; top:' + (wavelet.y - waveletSize/2) + 'px;')
           + ('width: ' + waveletSize + 'px;' + 'height: ' + waveletSize + 'px;')">
        <span class="wavelet__value" :style="`color: ${wavelet.color}; font-size: ${waveletSize/10 < 6 ? 6 : waveletSize/10}px;`">{{
            wavelet.data.value ? wavelet.data.value : '-'
          }}°</span>
        <div v-if="isColorWavelets" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
      </div>
    </template>


    <!-- Grid mode enabled -->
    <template v-if="gridMode">
      <template v-for="[key, map] in id_map" :key="key">
        <div class="wavelet wavelet_eternal" :style="('left:' + (map.x - waveletSize/2) + 'px; top:' + (map.y - waveletSize/2) + 'px;')
        + ('width: ' + waveletSize + 'px;' + 'height: ' + waveletSize + 'px;')"></div>
      </template>

      <!-- Coordinates tooltip -->
      <div class="mouse-coordinates-tooltip"
           :style="'top: ' + mouseTooltip.position.y + 'px; left: ' + mouseTooltip.position.x + 'px;'">
        <span class="me-3"><span class="fw-lighter opacity-75">X:</span> {{ mouse_x }}</span>
        <span><span class="fw-lighter opacity-75">Y:</span> {{ mouse_y }}</span>
      </div>
    </template>

    <div class="ui-wrapper mb-3" :style="uiConfiguration.positions[uiPosition].style">
      <div class="ui-container-toggle" :style="(id_map.size == 0 ? 'display: block !important; ' : '')">
        <!-- Connection status -->
        <div class="connection-status mb-3" :class="connectionStatus"
             :style="'background-color:' + connectionStatus + '; opacity: ' + (connectionState ? 1 : .4) + ';'"></div>

        <!--CSV upload-->
        <div class="mb-3">
          <label for="map-file-upload" class="form-label small"><span class="text-white-50">Upload map CSV</span>
            (<span
                :style="id_map.size == 0 ? 'color: red' : 'color: green'"> {{ id_map.size }} ids loaded</span>)</label>
          <input class="form-control form-control-sm" id="map-file-upload" type="file" @change="openFile">
        </div>
        <hr>

        <!--Grid look switch-->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="gridMode" id="grid-checkbox">
          <label class="form-check-label" for="grid-checkbox" style="color: white">
            Grid mode
          </label>
        </div>
        <!-- Crosshair cursor switch        -->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="crosshairCursor" id="crosshair-checkbox">
          <label class="form-check-label" for="crosshair-checkbox" style="color: white">
            Crosshair cursor
          </label>
        </div>
        <hr>

        <!--Simulate wavelets switch-->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="simulationMode" id="sim-checkbox"
                 @change="simulationSwitched">
          <label class="form-check-label" for="sim-checkbox" style="color: white">
            Enable simulation
          </label>
        </div>
        <hr>

        <!--Coloring wavelets-->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="isColorWavelets" id="color-wavelets-checkbox">
          <label class="form-check-label" for="color-wavelets-checkbox" style="color: white">
            Colorize wavelets
          </label>
        </div>
        <hr>

        <!-- Wavelet size -->
        <div>
          <span class="text-white-50 me-3">Wavelet size</span>
          <input class="form-control form-control-sm mb-2" type="number" placeholder="Size in pixels" style="max-width: 80px" v-model="waveletSize">
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 32">32</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 64">64</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 128">128</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 196">196</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 256">256</button>
        </div>
        <hr>


        <!--UI Position-->
        <div>
          <span class="text-white-50 me-3">UI position</span>
          <button type="button" class="btn btn-outline-light btn-sm me-2" v-on:click="uiPosition = 0">↖ Left</button>
          <button type="button" class="btn btn-outline-light btn-sm" v-on:click="uiPosition = 1">Right ↗</button>
        </div>
        <hr>

      </div>

    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'

const wavelets = ref(new Map())
const id_map = ref(new Map())
const gridMode = ref(false)

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
import {humanReadableTime} from "@/assets/js/helpers/time"

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


    const timestamp = wavelet.data.timestamp
    const coordinates = id_map.value.get(wavelet.data.tag)
    if (coordinates) {
      console.log('Tag ' + wavelet.data.tag + ' (' + timestamp + ' / ' + humanReadableTime(timestamp) + ') is in map. Render.')
      wavelet.inject(coordinates)
      wavelets.value.set(wavelet.data.tag, wavelet)
    } else {
      console.log('Tag ' + wavelet.data.tag + ' (' + timestamp + ' / ' + humanReadableTime(timestamp) + ') is not in map!')
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

const mouse_x = ref(0)
const mouse_y = ref(0)
const mouseTooltip = reactive({
  position: {
    x: 0,
    y: 0,
  }
})

function updateCoordinates(event) {
  if (gridMode.value) {
    mouse_x.value = event.clientX
    mouse_y.value = event.clientY
    // Update mouse tooltip positioning
    mouseTooltip.position.x = event.clientX
    mouseTooltip.position.y = event.clientY
  }
}

const crosshairCursor = ref(false)

const uiPosition = ref(0)
const uiConfiguration = reactive({
  positions: [
    {
      style: 'left: 0; top: 0;'
    },
    {
      style: 'right: 0; top: 0;'
    },
  ]
})

const waveletSize = ref(128)

</script>

<style scoped lang="sass">
body
  background-color: #000
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


  // This is two hiding modificators for further animation restart implementation
  &_hiding1
    -moz-animation: hidingAnimation1 .4s ease-in 9s forwards
    -webkit-animation: hidingAnimation1 .4s ease-in 9s forwards
    -o-animation: hidingAnimation1 .4s ease-in 9s forwards
    animation: hidingAnimation1 .4s ease-in 9s forwards
    -webkit-animation-fill-mode: forwards
    animation-fill-mode: forwards

  &_hiding2
    -moz-animation: hidingAnimation2 .4s ease-in 9s forwards
    -webkit-animation: hidingAnimation2 .4s ease-in 9s forwards
    -o-animation: hidingAnimation2 .4s ease-in 9s forwards
    animation: hidingAnimation2 .4s ease-in 9s forwards
    -webkit-animation-fill-mode: forwards
    animation-fill-mode: forwards

  &_eternal
    -moz-animation: none
    -webkit-animation: none
    -o-animation: none
    animation: none
    -webkit-animation-fill-mode: none
    animation-fill-mode: none
    opacity: .5
    // Vertical cross line
    &:before
      content: ''
      display: block
      width: 1px
      height: 100%
      background-color: #fff
      left: 50%
      position: absolute
    // Horizontal cross line
    &:after
      content: ''
      display: block
      width: 100%
      height: 1px
      background-color: #fff
      top: 50%
      position: absolute


  &__value
    color: rgba(255, 255, 255, 1)
    background-color: black
    display: inline-block
    position: absolute
    left: 50%
    transform: translateX(-50%)
    top: 10%
    font-weight: 900
    padding: 0 4px
    text-align: center
    border-radius: 6px
    z-index: 110

.shine
  background-image: url('@/assets/shinea.gif')
  background-size: contain
  background-position: center
  position: absolute

@-webkit-keyframes hidingAnimation1
  from
    opacity: 1
  to
    opacity: 0

@keyframes hidingAnimation1
  from
    opacity: 1
  to
    opacity: 0

@-webkit-keyframes hidingAnimation2
  from
    opacity: 1
  to
    opacity: 0

@keyframes hidingAnimation2
  from
    opacity: 1
  to
    opacity: 0


.ui-wrapper
  position: absolute
  width: 260px
  min-height: 600px
  opacity: 1


  & > div
    display: none
    background-color: rgba(0, 0, 0, .6)
    padding: 10px

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
  border-radius: 100%
  mix-blend-mode: multiply

.mouse-coordinates-tooltip
  color: wheat
  position: absolute
  font-size: 14px
  font-weight: bold
  left: 0
  top: 0
  transform: translate(0, calc(-100% - 16px))
  padding: 0 4px
  background-color: rgba(0, 0, 0, .5)
  border-radius: 4px
  z-index: 999

hr
  box-shadow: 0 1px 0 0 wheat
</style>
