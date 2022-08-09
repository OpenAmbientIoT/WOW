<template>
  <div class="display" v-on:mousemove="updateCoordinates"
       :style="(gridMode && crosshairCursor ? 'cursor: crosshair;' : '') + (gridMode ? 'box-shadow: inset 0 0 0 2px wheat;' : '')">
    <!-- Wavelets to display -->
    <template v-for="[key, wavelet] in wavelets" :key="key">
      <WaveletComponent v-if="selectedRenderingType == SVG" :wavelet="wavelet"/>
      <GifWaveletComponent v-if="selectedRenderingType == GIF" :wavelet="wavelet"/>
      <VideoWaveletComponent v-if="selectedRenderingType == VIDEO" :wavelet="wavelet"/>
    </template>


    <!-- Grid mode enabled -->
    <template v-if="gridMode">
      <template v-for="[key, map] in id_map" :key="key">
        <GridWaveletComponent :size="waveletSize" :map="map"/>
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

        <!--Play sound-->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="isSoundOn" id="sound-on-checkbox">
          <label class="form-check-label" for="sound-on-checkbox" style="color: white">
            Sound
          </label>
        </div>
        <hr>

        <!-- Wavelet size -->
        <div>
          <div class="text-white-50 me-3 mb-2">Wavelet size</div>
          <input class="form-control form-control-sm mb-2" type="number" placeholder="Size in pixels"
                 style="max-width: 80px" v-model="waveletSize">
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 32">32</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 64">64</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 128">128
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 196">196
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="waveletSize = 256">256
          </button>
        </div>
        <hr>

        <!-- Min Max Temp settings -->
        <div class="row">
          <div class="col">
            <div class="text-white-50 me-3 mb-2">Min t</div>
            <input class="form-control form-control-sm mb-2" type="number" placeholder="Min t" v-model="minCelsius">
          </div>
          <div class="col">
            <div class="text-white-50 me-3 mb-2">Max t</div>
            <input class="form-control form-control-sm mb-2" type="number" placeholder="Max t" v-model="maxCelsius">
          </div>
        </div>
        <hr>

        <!-- Rendering type -->
        <div>
          <span class="text-white-50 me-1">Rendering type</span>
          <div class="form-check form-switch mb-1" v-for="renderingType in renderingTypes" :key="renderingType.name">
            <input class="form-check-input" type="checkbox" v-model="renderingType.enabled" v-on:change="renderingTypeChanged" :value="renderingType.name" :id="`rendering-type-checkbox-${renderingType.name}`">
            <label class="form-check-label" :for="`rendering-type-checkbox-${renderingType.name}`" style="color: white">
              {{ renderingType.name }} <sup><span class="small text-white-50">{{ renderingType.description }}</span></sup>
            </label>
          </div>
        </div>
        <hr>

        <!-- Handle events -->
        <div>
          <span class="text-white-50 me-1">Handle events</span>
          <div class="form-check form-switch mb-1" v-for="eventType in eventsTypes" :key="eventType.name">
            <input class="form-check-input" type="checkbox" v-model="eventType.enabled" :id="`handle-wavelets-checkbox-${eventType.name}`">
            <label class="form-check-label" :for="`handle-wavelets-checkbox-${eventType.name}`" style="color: white">
              {{ eventType.name }}
            </label>
          </div>
          <div class="form-check form-switch mb-1">
            <input class="form-check-input" type="checkbox" v-model="debugMode" id="debug-wavelets-checkbox">
            <label class="form-check-label" for="debug-wavelets-checkbox" style="color: rosybrown">
              Debug mode
            </label>
          </div>
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
const consoleEvents = ref(false)

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


import {eventsConfig} from "@/assets/js/classes/events/EventsConfig";
import {renderingConfig, SVG, GIF, VIDEO} from "@/assets/js/classes/RenderingConfig";

const eventsTypes = reactive(eventsConfig.eventsTypes)
const renderingTypes = reactive(renderingConfig.types)

import {rgbColor} from "@/assets/js/helpers/temperaturecolor"
import {humanReadableTime} from "@/assets/js/helpers/time"
import WaveletComponent from "@/components/WaveletComponent"
import GridWaveletComponent from "@/components/GridWaveletComponent"
import GifWaveletComponent from "@/components/GifWaveletComponent"
import EventsBuilder from "@/assets/js/classes/EventsBuilder";
import VideoWaveletComponent from "@/components/VideoWaveletComponent";

// Rendering
const selectedRenderingType = ref(SVG)
function renderingTypeChanged(e) {
  const selected = e.target.value
  renderingTypes.forEach((type) => {
    if (type.name != selected) {
      type.enabled = false
    }
  })
  selectedRenderingType.value = selected
}

const minCelsius = ref(20)
const maxCelsius = ref(30)

function render(message) {
  if (gridMode.value === true) {
    return false
  }
  if (typeof message == 'string') {
    // Get event data
    const event = EventsBuilder.parse(message, eventsTypes)
    if (event) {
      // Create new wavelet element
      const wavelet = new WaveletElement();

      wavelet.event = event
      const color = rgbColor(wavelet.event.value, minCelsius.value, maxCelsius.value)
      wavelet.color = `rgb(${color[0]},${color[1]},${color[2]})`
      wavelet.size = waveletSize.value
      wavelet.colored = isColorWavelets.value
      wavelet.debug = debugMode.value

      // Get element coordinates
      if (consoleEvents.value) console.log(wavelet.event)
      const timestamp = wavelet.event.timestamp
      const coordinates = id_map.value.get(wavelet.event.tag)
      if (coordinates) {
        if (consoleEvents.value) console.log('Tag ' + wavelet.event.tag + ' (' + timestamp + ' / ' + humanReadableTime(timestamp) + ') is in map. Render.')
        wavelet.inject(coordinates)
        wavelets.value.set(wavelet.event.tag, wavelet)
        if (isSoundOn.value) {
          const sound = new Audio('static/sound/bell-high.mp3')
          sound.play()
        }
      } else {
        if (consoleEvents.value) console.log('Tag ' + wavelet.event.tag + ' (' + timestamp + ' / ' + humanReadableTime(timestamp) + ') is not in map!')
      }
    } else {
      if (consoleEvents.value) console.log('Skip message ' + message)
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
  // Get random event type from the list
  const eventsType = eventsTypes[Math.floor(Math.random() * eventsTypes.length)];
  let message = 'events,tagId=' + tag + ',eventName=' + eventsType.name + ',eventValue=' + value + ',timestamp=' + Date.now()
  return message
}

function runSimulation() {
  if (simulationMode.value === false) {
    return false
  }
  connectionState.value = !connectionState.value
  const message = generateMessage()
  render(message)
  setTimeout(runSimulation, Math.floor(Math.random() * 10) + 1)
}

function clearOld() {
  const lifetime = 10 // seconds
  const now = Date.now()
  wavelets.value.forEach((wavelet) => {
    const milliseconds = now - wavelet.created
    const seconds = Math.floor(milliseconds / 1000)

    if (!wavelet.options.fadein) {
      // Fadein
      if (consoleEvents.value) console.log('Time to fadein for #' + wavelet.id)
      wavelet.options.fadein = true
    }

    if (seconds >= lifetime - 1 && !wavelet.options.fadeout) {
      // Fadeout
      if (consoleEvents.value) console.log('Time to fadeout for #' + wavelet.id)
      wavelet.options.fadeout = true
    }

    if (seconds >= lifetime) {
      // Time to remove
      if (consoleEvents.value) console.log('Lifetime exceeded ' + lifetime + 's for #' + wavelet.id + ' – removing')
      wavelets.value.delete(wavelet.event.tag)
    }
  })
  setTimeout(clearOld, 100)
}

const debugMode = ref(false)
const isColorWavelets = ref(false)
const isSoundOn = ref(false)
const waveletSize = ref(128)

const mouse_x = ref(0)
const mouse_y = ref(0)
const mouseTooltip = reactive({
  position: {
    x: 0,
    y: 0,
  }
})

function updateCoordinates(e) {
  if (gridMode.value) {
    mouse_x.value = e.clientX
    mouse_y.value = e.clientY
    // Update mouse tooltip positioning
    mouseTooltip.position.x = e.clientX
    mouseTooltip.position.y = e.clientY
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

.ui-wrapper
  position: absolute
  width: 260px
  min-height: 600px
  opacity: 1
  z-index: 9999


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
