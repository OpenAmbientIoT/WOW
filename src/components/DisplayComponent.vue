<template>
  <div :class="'display' + (backgroundImageEnabled ? ' display_bg' : '')"
       v-on:mousemove="updateCoordinates"
       :style="(gridMode && crosshairCursor ? 'cursor: crosshair;' : '') +
       (gridMode ? 'box-shadow: inset 0 0 0 2px wheat;' : '') +
       (backgroundImageEnabled && backgroundImage ? 'background-image: url(' + backgroundImage + ')' : '')">

    <!-- Video background container -->
    <video v-if="backgroundVideoEnabled && backgroundVideo" autoplay muted loop id="video">
      <source :src="backgroundVideo" type="video/mp4">
    </video>

    <!-- Wavelets to display -->
    <!-- Canvas/webgl -->
    <div v-if="selectedRenderingType === WEBGL" id="canvas-container"></div>
    <!-- SVG, GIF -->
    <template v-if="selectedRenderingType !== WEBGL">
      <template v-for="[key, wavelet] in wavelets" :key="key">
        <SvgWaveletComponent v-if="selectedRenderingType === SVG" :wavelet="wavelet"/>
        <GifWaveletComponent v-if="selectedRenderingType === GIF" :wavelet="wavelet"/>
      </template>
    </template>


    <!-- Grid mode enabled -->
    <template v-if="gridMode">
      <template v-for="[key, map] in idsMap" :key="key">
        <GridWaveletComponent :size="basicSize" :map="map"/>
      </template>

      <!-- Coordinates tooltip -->
      <div class="mouse-coordinates-tooltip"
           :style="'top: ' + mouseTooltip.position.y + 'px; left: ' + mouseTooltip.position.x + 'px;'">
        <span class="me-3"><span class="fw-lighter opacity-75">X:</span> {{ mouse_x }}</span>
        <span><span class="fw-lighter opacity-75">Y:</span> {{ mouse_y }}</span>
      </div>
    </template>

    <div class="ui-wrapper ui-wrapper_customer mb-3" :style="uiConfiguration.positions[uiPosition].style">
      <div class="ui-container-toggle" :style="(idsMap.size === 0 ? 'display: block !important; ' : '')">

        <!-- Connection status -->
        <div class="connection-status mb-3" :class="connectionStatus"
             :style="'background-color:' + connectionStatus + '; opacity: ' + (connectionState ? 1 : .4) + ';'"></div>

        <!--CSV upload-->
        <div class="mb-3">
          <label for="map-file-upload" class="form-label small"><span class="text-white-50">Upload map CSV</span>
            (<span
                :style="idsMap.size === 0 ? 'color: red' : 'color: green'"> {{ idsMap.size }} ids loaded</span>)</label>
          <input class="form-control form-control-sm" id="map-file-upload" type="file" @change="openFile">
        </div>
        <hr>

        <!--Simulate wavelets switch-->
        <div>
          <div class="text-white-50 me-3 mb-2">Simulation</div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="simulationMode" id="sim-checkbox"
                   @change="simulationSwitched">
            <label class="form-check-label" for="sim-checkbox" style="color: white">
              Enable
            </label>
          </div>
          <div>
            <div class="text-white-50 me-3 mb-2 small">Events per second</div>
            <input class="form-control form-control-sm mb-2" type="number" placeholder="Set amount"
                   style="max-width: 110px" v-model="simulatedAverageEventsPerSecond">
          </div>
        </div>
        <hr>

        <!--Grid look switch-->
        <div>
          <div class="text-white-50 me-3 mb-2">Grid</div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="gridMode" id="grid-checkbox">
            <label class="form-check-label" for="grid-checkbox" style="color: white">
              Enable
            </label>
          </div>
          <!-- Crosshair cursor switch        -->
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="crosshairCursor" id="crosshair-checkbox">
            <label class="form-check-label" for="crosshair-checkbox" style="color: white">
              Crosshair cursor
            </label>
          </div>
        </div>
        <hr>

        <!-- Background -->
        <div>
          <div class="text-white-50 me-3 mb-2">Background</div>
          <!-- Background image -->
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="backgroundImageEnabled"
                   id="background-image-enable-checkbox">
            <label class="form-check-label" for="background-image-enable-checkbox" style="color: white">
              Image
            </label>
          </div>
          <!-- Upload image -->
          <div v-if="backgroundImageEnabled" class="mb-3">
            <label for="background-image-upload" class="form-label small"><span
                class="text-white-50">Upload image</span></label>
            <input class="form-control form-control-sm" id="background-image-upload" type="file"
                   @change="uploadBackgroundImage">
          </div>
          <!-- Background video -->
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="backgroundVideoEnabled"
                   id="background-video-enable-checkbox">
            <label class="form-check-label" for="background-video-enable-checkbox" style="color: white">
              Video
            </label>
          </div>
          <!-- Upload video -->
          <div v-if="backgroundVideoEnabled" class="mb-3">
            <label for="background-video-upload" class="form-label small"><span
                class="text-white-50">Upload video</span></label>
            <input class="form-control form-control-sm" id="background-video-upload" type="file"
                   @change="uploadBackgroundVideo">
          </div>
        </div>
        <hr>

        <!--Coloring wavelets-->
        <div class="form-check form-switch mb-3 d-none">
          <input class="form-check-input" type="checkbox" v-model="isColorWavelets" id="color-wavelets-checkbox">
          <label class="form-check-label" for="color-wavelets-checkbox" style="color: white">
            Colorize wavelets
          </label>
        </div>
        <hr class="d-none">

        <!--Play sound-->
        <div>
          <div class="text-white-50 me-3 mb-2">Sound</div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="isSoundOn" id="sound-on-checkbox">
            <label class="form-check-label" for="sound-on-checkbox" style="color: white">
              Enable 🔉
            </label>
          </div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="isSoundSimultaneous"
                   id="sound-simultaneous-checkbox">
            <label class="form-check-label" for="sound-simultaneous-checkbox" style="color: white">
              Play simultaneous
            </label>
          </div>
          <!-- specify mp3 -->
          <div class="text-white-50 small mb-2">Select mp3</div>
          <select class="form-select form-select-sm mb-1" aria-label="" v-model="soundFileName"
                  @change="soundFileChanged">
            <option v-for="file in soundLibrary.files" :value="file" :key="file">{{ file }}</option>
          </select>
          <!-- upload mp3 -->
          <div class="mb-3">
            <label for="mp3-upload" class="form-label small"><span class="text-white-50">Or upload mp3</span></label>
            <input class="form-control form-control-sm" id="mp3-upload" type="file" @change="uploadMp3">
          </div>
        </div>
        <hr>

        <!-- Basic wavelet size -->
        <div>
          <div class="text-white-50 me-3 mb-2">Basic wavelet size ↔</div>
          <input class="form-control form-control-sm mb-2" type="number" placeholder="Size in pixels"
                 style="max-width: 80px" v-model="basicSize">
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 32">32</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 64">64</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 128">128
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 196">196
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 256">256
          </button>
        </div>
        <hr>

        <!-- Disk size -->
        <div>
          <div class="text-white-50 me-3 mb-2">Disk size ↔</div>
          <input class="form-control form-control-sm mb-2" type="number" placeholder="Size in pixels"
                 style="max-width: 80px" v-model="diskSize">
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 32">32</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 64">64</button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 128">128
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 196">196
          </button>
          <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 256">256
          </button>
        </div>
        <hr>

        <!-- Rssi scale factor -->
        <div>
          <div class="text-white-50 me-3 mb-2">RSSI scale factor</div>
          <input class="form-control form-control-sm mb-2 d-inline-block" type="number" placeholder="Size in pixels"
                 style="max-width: 80px" v-model="rssiScaleFactor"> <span
            class="text-muted small ms-3"> Average RSSI {{ averageRssi }}</span>
          <div class="text-muted mt-1 font-monospace" style="font-size: 9px">ui size * (scale/10) * (average
            rssi/rssi)
          </div>
        </div>
        <hr>

        <!-- Color disk timeout -->
        <div>
          <div class="text-white-50 me-3 mb-2">Color disk timeout, s</div>
          <input class="form-control form-control-sm mb-2" type="number" placeholder="Amount in seconds"
                 style="max-width: 80px" v-model="temperatureDiskTimeout">
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
            <input class="form-check-input" type="checkbox" v-model="renderingType.enabled"
                   v-on:change="renderingTypeChanged" :value="renderingType.name"
                   :id="`rendering-type-checkbox-${renderingType.name}`">
            <label class="form-check-label" :for="`rendering-type-checkbox-${renderingType.name}`" style="color: white">
              {{ renderingType.name }} <sup><span class="small text-white-50">{{
                renderingType.description
              }}</span></sup>
            </label>
          </div>
        </div>
        <hr>

        <!-- Handle events -->
        <div>
          <span class="text-white-50 me-1">Handle events</span>
          <div class="form-check form-switch mb-1" v-for="eventType in eventsTypes" :key="eventType.name">
            <input class="form-check-input" type="checkbox" v-model="eventType.enabled"
                   :id="`handle-wavelets-checkbox-${eventType.name}`">
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

        <!-- RSSI size for events -->
        <div>
          <span class="text-white-50 me-1">RSSI-based size</span>
          <div class="form-check form-switch mb-1" v-for="rssiResizeEvent in rssiResizeEvents"
               :key="rssiResizeEvent.event">
            <input class="form-check-input" type="checkbox" v-model="rssiResizeEvent.enabled"
                   :id="`rssi-event-size-checkbox-${rssiResizeEvent.event}`">
            <label class="form-check-label" :for="`rssi-event-size-checkbox-${rssiResizeEvent.event}`"
                   style="color: white">
              {{ rssiResizeEvent.event }}
            </label>
          </div>
        </div>
        <hr>

        <!-- Console log -->
        <div>
          <span class="text-white-50 me-1">Console log</span>
          <div class="form-check form-switch mb-1" v-for="consoleSetting in consoleSettings" :key="consoleSetting.name">
            <input class="form-check-input" type="checkbox" v-model="consoleSetting.state.value"
                   :id="`console-log-checkbox-${consoleSetting.name}`">
            <label class="form-check-label" :for="`console-log-checkbox-${consoleSetting.name}`" style="color: white">
              {{ consoleSetting.name }}
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
import {ref, onMounted, reactive, watch, onBeforeMount} from 'vue'

let appSettings = {}
// Get saved app settings
if (localStorage.getItem('appSettings')) {
  appSettings = JSON.parse(localStorage.getItem('appSettings'))
} else {
  localStorage.setItem('appSettings', JSON.stringify(appSettings))
}

const wavelets = ref(new Map())
const idsMap = ref(new Map())
const rssi = ref(new Map())
const rssiScaleFactor = ref(1)
const temperatureDiskTimeout = ref(15)

import useBackgrounds from "@/assets/js/hooks/useBackgrounds";
// eslint-disable-next-line
const {
  backgroundImageEnabled,
  backgroundImage,
  uploadBackgroundImage,
  backgroundVideoEnabled,
  backgroundVideo,
  uploadBackgroundVideo
} = useBackgrounds()


const gridMode = ref(false)
const consoleEvents = ref(false)
const consoleRenderingInfo = ref(false)
const consoleLifetimeInfo = ref(false)
const consoleFadingInfo = ref(false)
let consoleSettings = [
  {state: consoleEvents, name: 'Events'},
  {state: consoleRenderingInfo, name: 'Rendering'},
  {state: consoleLifetimeInfo, name: 'Lifetime'},
  {state: consoleFadingInfo, name: 'Fading'}
]

import mqttclient from "@/assets/js/mqttclient";
import WaveletElement from "@/assets/js/classes/WaveletElement";

// eslint-disable-next-line
function connect() {
  mqttclient.createConnection(process, renderConnection)
  mqttclient.doSubscribe()
}

function disconnect() {
  mqttclient.doUnSubscribe()
  mqttclient.destroyConnection()
}


import {eventsConfig, RSSI, TEMP_C} from "@/assets/js/classes/events/EventsConfig";
import {renderingConfig, SVG, GIF, WEBGL} from "@/assets/js/classes/RenderingConfig";


const renderingTypes = (appSettings.renderingTypes ? reactive(appSettings.renderingTypes) : reactive(renderingConfig.types))

const rssiResizeEvents = (appSettings.rssiResizeEvents ? reactive(appSettings.rssiResizeEvents) : reactive(rssiConfig.resizeEvents))

// Event types
let eventsTypes = reactive(eventsConfig.eventsTypes)
if (appSettings.eventsTypes && appSettings.eventsTypes.length == eventsConfig.eventsTypes.length) {
  eventsTypes = reactive(appSettings.eventsTypes)
}

// Watch event types list changed to clear RSSI from values
watch(eventsTypes, (newEventsTypes) => {
  newEventsTypes.forEach((eventType) => {
    if (eventType.name == RSSI && !eventType.enabled) {
      rssi.value.clear()
      averageRssi.value = 70
    }
  })
})


import {rgbColor} from "@/assets/js/helpers/temperaturecolor"
import {humanReadableTime} from "@/assets/js/helpers/time"
import SvgWaveletComponent from "@/components/SvgWaveletComponent"
import GridWaveletComponent from "@/components/GridWaveletComponent"
import GifWaveletComponent from "@/components/GifWaveletComponent"
import EventsBuilder from "@/assets/js/classes/EventsBuilder"


const minCelsius = ref(20)
const maxCelsius = ref(30)
const averageRssi = ref(70)
//let lastRssiCalculation = 0


import {toSize, rssiConfig, isRssiSizeForEventEnabled} from "@/assets/js/helpers/rssi";

// Parse event message, create wavelet element, inject necessary data into wavelet
function process(message) {
  if (gridMode.value === true) {
    return false
  }

  if (consoleEvents.value) console.log(message)

  if (typeof message == 'string') {
    // Get event data
    const event = EventsBuilder.parse(message, eventsTypes)
    if (event) {

      // Add RSSI value (don't add to wavelets list) and calculate average RSSI
      if (event.name === RSSI) {
        rssi.value.set(event.tag, event.raw)
        // Prevent from average being calculated too often
        //const secondsPassed = Math.floor((new Date() - lastRssiCalculation)/1000)
        //if (lastRssiCalculation === 0 || secondsPassed > 60) {
        //  averageRssi.value = calculateAverageRssi(rssi.value)
        //  lastRssiCalculation = new Date()
        //}
      }

      // Get element tagCsvData (csv data)
      if (consoleEvents.value) console.log(event)
      const tagCsvData = idsMap.value.get(event.tag)
      if (tagCsvData) {
        // Create new wavelet element
        const wavelet = new WaveletElement();
        wavelet.event = event
        wavelet.id = event.tag
        // When non TEMP_C event check if we have already TEMP_C wavelet
        if (event.name !== TEMP_C && wavelets.value.has(event.tag)) {
          const existing = wavelets.value.get(event.tag)
          if (existing.event.name === TEMP_C) {
            wavelet.predecessor = existing
          } else if (existing.predecessor && existing.predecessor.event.name === TEMP_C) {
            wavelet.predecessor = existing.predecessor
          }
        }

        //if (!wavelet.color || wavelet.color === 'rgb(255,255,255)') {
          const color = rgbColor(wavelet.event.value, minCelsius.value, maxCelsius.value)
          wavelet.color = `rgb(${color[0]},${color[1]},${color[2]})`
        //}

        // Get size
        let size = basicSize.value
        // Try RSSI
        if (rssi.value.has(event.tag) && isRssiSizeForEventEnabled(event.name)) {
          size = toSize(averageRssi.value, rssi.value.get(event.tag), rssiScaleFactor.value, basicSize.value)
          // Try CSV data
        } else if (tagCsvData.size) {
          size = tagCsvData.size
        }
        wavelet.size = size

        wavelet.basicSize = basicSize.value
        wavelet.diskSize = diskSize.value

        wavelet.colored = isColorWavelets.value
        wavelet.debug = debugMode.value
        wavelet.inject(tagCsvData)
        wavelets.value.set(event.tag, wavelet)

        // Console
        if (consoleRenderingInfo.value) console.log('Tag ' + event.tag + ' (' + event.timestamp + ' / ' + humanReadableTime(event.timestamp) + ') is in map. Render.')

        // Sound
        if (isSoundOn.value) {
          if (isSoundSimultaneous.value) {
            sound = new Audio(soundFilePath)
          }
          sound.play()
        }

        // Canvas Case
        if (selectedRenderingType.value === WEBGL) {
          drawWavelet(wavelet, basicSize)
        }
      } else {
        // Console
        if (consoleRenderingInfo.value) console.log('Tag ' + event.tag + ' (' + event.timestamp + ' / ' + humanReadableTime(event.timestamp) + ') is not in map!')
      }
    } else {
      if (consoleEvents.value) console.log('Skip message "' + message + '" (disabled or can\'t parse)')
    }
  }
}

import {parse} from "@/assets/js/helpers/csv"

function openFile(event) {
  let input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
    idsMap.value = parse(reader.result, eventsTypes)
    console.log('Uploaded CSV:');
    console.log(reader.result.substring(0, 200));
  };

  reader.readAsText(input.files[0]);
}


const simulationMode = ref(false)

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

const simulatedAverageEventsPerSecond = ref(1)
import useSimulation from "@/assets/js/hooks/useSimulation";

const {generateMessage} = useSimulation()

function runSimulation() {
  if (simulationMode.value === false) {
    return false
  }
  connectionState.value = !connectionState.value
  const message = generateMessage(eventsTypes, idsMap.value)
  process(message)
  const divider = simulatedAverageEventsPerSecond.value > 0 ? simulatedAverageEventsPerSecond.value : 1
  setTimeout(runSimulation, 1000 / divider)
}

const connectionState = ref(true)
const connectionStatus = ref('red')

function renderConnection(status) {
  connectionState.value = !connectionState.value
  connectionStatus.value = status
}


function inspectWavelets() {
  const now = Date.now()
  wavelets.value.forEach((wavelet) => {
    let lifetime = 10 // seconds
    let ringsFadeoutTime = 1
    let waveletFadeoutTime = 1
    let ringsLifetime = lifetime

    // Extend temperature wavelets lifetime (based on specified color disc time)
    if (wavelet.event.name === TEMP_C || (wavelet.predecessor && wavelet.predecessor.event.name === TEMP_C)) {
      const temperatureWaveletLifetime = temperatureDiskTimeout.value
      lifetime = lifetime < temperatureWaveletLifetime ? temperatureWaveletLifetime : lifetime
    }

    const milliseconds = now - wavelet.created
    const passedSeconds = Math.floor(milliseconds / 1000)

    // Fadein
    if (!wavelet.options.fadein) {
      if (consoleFadingInfo.value) console.log('Time to fadein for #' + wavelet.event.tag)
      wavelet.options.fadein = true
      if (wavelet.predecessor) {
        wavelet.predecessor.options.fadein = true
      }
    }

    // Start fadeout for wavelet rings for temperature events earlier than fadeout whole wavelet
    if (wavelet.event.name === TEMP_C || (wavelet.predecessor && wavelet.predecessor.event.name === TEMP_C)) {
      if (passedSeconds >= ringsLifetime - ringsFadeoutTime && !wavelet.options.ringsFadeout) {
        // Fadeout rings
        if (consoleFadingInfo.value) console.log('Time to fadeout rings for #' + wavelet.event.tag)
        wavelet.options.ringsFadeout = true
      }
    }

    // Start fadeout for whole wavelet
    if (passedSeconds >= lifetime - waveletFadeoutTime && !wavelet.options.fadeout) {
      if (consoleFadingInfo.value) console.log('Time to fadeout for #' + wavelet.event.tag)
      wavelet.options.fadeout = true
    }

    // Time to remove whole wavelet
    if (passedSeconds >= lifetime) {
      if (consoleLifetimeInfo.value) console.log('Lifetime exceeded ' + lifetime + 's for #' + wavelet.event.tag + ' – removing')
      wavelets.value.delete(wavelet.event.tag)

      // Remove from Canvas (PIXI)
      container.children.forEach((waveletContainer) => {
        if (wavelet.event.tag === waveletContainer.wavelet.event.tag) {
          container.removeChild(waveletContainer)
        }
      })
    }

    // Remove predecessor predecessor
    if (wavelet.predecessor && wavelet.predecessor.predecessor) {
      delete wavelet.predecessor.predecessor
    }
  })

  setTimeout(inspectWavelets, 20)
}

const debugMode = ref(false)
const isColorWavelets = ref(false)


import {soundLibrary} from "@/assets/js/helpers/sound";

const isSoundOn = ref(false)
const isSoundSimultaneous = ref(false)
const soundFolderPath = 'static/sound/'
const soundFileName = ((appSettings.soundFileName && appSettings.soundFileName.includes('.mp3')) ? ref(appSettings.soundFileName) : ref('bell-high.mp3'))
let soundFilePath = soundFolderPath + soundFileName.value
let sound = new Audio(soundFilePath)

// Update sound file if changed
function soundFileChanged() {
  soundFilePath = soundFolderPath + soundFileName.value
  sound = new Audio(soundFilePath)
}

function uploadMp3(event) {
  let input = event.target;
  if (!input.files.length) return
  soundFilePath = URL.createObjectURL(input.files[0]);
  sound = new Audio(soundFilePath)
}

const basicSize = ref(128)
const diskSize = ref(128)

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


import {pixi, container, ticks, drawWavelet} from "@/assets/js/hooks/usePixi";


// Rendering type
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

onBeforeMount(() => {
  if (appSettings) {
    appSettings.selectedRenderingType ? selectedRenderingType.value = appSettings.selectedRenderingType : null
    appSettings.basicSize ? basicSize.value = appSettings.basicSize : null
    appSettings.diskSize ? diskSize.value = appSettings.diskSize : null
    appSettings.rssiScaleFactor ? rssiScaleFactor.value = appSettings.rssiScaleFactor : null
    appSettings.temperatureDiskTimeout ? temperatureDiskTimeout.value = appSettings.temperatureDiskTimeout : null
    appSettings.minCelsius ? minCelsius.value = appSettings.minCelsius : null
    appSettings.maxCelsius ? maxCelsius.value = appSettings.maxCelsius : null
    appSettings.simulationMode ? simulationMode.value = appSettings.simulationMode : null
    appSettings.gridMode ? gridMode.value = appSettings.gridMode : null
    appSettings.crosshairCursor ? crosshairCursor.value = appSettings.crosshairCursor : null
    appSettings.isSoundOn ? isSoundOn.value = appSettings.isSoundOn : null
    appSettings.isSoundSimultaneous ? isSoundSimultaneous.value = appSettings.isSoundSimultaneous : null

    if (appSettings.idsMap && appSettings.idsMap.length) {
      appSettings.idsMap.forEach((savedTagData) => {
        idsMap.value.set(savedTagData.tag, savedTagData)
      })
    }

    appSettings.debugMode ? debugMode.value = appSettings.debugMode : null

    //
    appSettings.consoleEvents ? consoleEvents.value = appSettings.consoleEvents : null
    appSettings.consoleRenderingInfo ? consoleRenderingInfo.value = appSettings.consoleRenderingInfo : null
    appSettings.consoleLifetimeInfo ? consoleLifetimeInfo.value = appSettings.consoleLifetimeInfo : null
    appSettings.consoleFadingInfo ? consoleFadingInfo.value = appSettings.consoleFadingInfo : null
  }
})

//
onMounted(() => {
  // Simulation / connect
  if (simulationMode.value === true) {
    connectionStatus.value = 'green'
    runSimulation()
  } else {
    connectionStatus.value = 'red'
    connect()
  }
  // Remove expired wavelets
  inspectWavelets()

  // Pixi / canvas / WebGL
  const canvas = document.getElementById('canvas-container')
  if (canvas) {
    canvas.appendChild(pixi.view)
    ticks(selectedRenderingType)
  }

  window.addEventListener("beforeunload", leaving);
})

function leaving() {
  console.log('Disconnect on leaving')
  disconnect()
}

// Saving settings
watch([
      selectedRenderingType,
      basicSize,
      diskSize,
      rssiScaleFactor,
      temperatureDiskTimeout,
      minCelsius,
      maxCelsius,
      idsMap,
      simulationMode,
      gridMode,
      crosshairCursor,
      isSoundOn,
      isSoundSimultaneous,
      soundFileName,
      renderingTypes,
      eventsTypes,
      debugMode,
      rssiResizeEvents,
      consoleEvents,
      consoleRenderingInfo,
      consoleLifetimeInfo,
      consoleFadingInfo,
    ],
    ([
       selectedRenderingTypeNew,
       basicSizeNew,
       diskSizeNew,
       rssiScaleFactorNew,
       temperatureDiskTimeoutNew,
       minCelsiusNew,
       maxCelsiusNew,
       idsMapNew,
       simulationModeNew,
       gridModeNew,
       crosshairCursorNew,
       isSoundOnNew,
       isSoundSimultaneousNew,
       soundFileNameNew,
       renderingTypesNew,
       eventsTypesNew,
       debugModeNew,
       rssiResizeEventsNew,
       consoleEventsNew,
       consoleRenderingInfoNew,
       consoleLifetimeInfoNew,
       consoleFadingInfoNew
     ]) => {
      if (!appSettings) {
        appSettings = {}
      }
      appSettings.selectedRenderingType = selectedRenderingTypeNew
      appSettings.basicSize = basicSizeNew
      appSettings.diskSize = diskSizeNew
      appSettings.rssiScaleFactor = rssiScaleFactorNew
      appSettings.temperatureDiskTimeout = temperatureDiskTimeoutNew
      appSettings.minCelsius = minCelsiusNew
      appSettings.maxCelsius = maxCelsiusNew
      appSettings.simulationMode = simulationModeNew
      appSettings.gridMode = gridModeNew
      appSettings.crosshairCursor = crosshairCursorNew
      appSettings.isSoundOn = isSoundOnNew
      appSettings.isSoundSimultaneous = isSoundSimultaneousNew
      if (soundFileNameNew.includes('.mp3')) {
        appSettings.soundFileName = soundFileNameNew
      }

      if (idsMapNew.size) {
        const uploadedMap = [...idsMapNew.values()]
        if (uploadedMap.length) {
          appSettings.idsMap = uploadedMap
        }
      }

      appSettings.renderingTypes = renderingTypesNew
      appSettings.eventsTypes = eventsTypesNew
      appSettings.debugMode = debugModeNew
      appSettings.rssiResizeEvents = rssiResizeEventsNew

      appSettings.consoleEvents = consoleEventsNew
      appSettings.consoleRenderingInfo = consoleRenderingInfoNew
      appSettings.consoleLifetimeInfo = consoleLifetimeInfoNew
      appSettings.consoleFadingInfo = consoleFadingInfoNew

      localStorage.setItem('appSettings', JSON.stringify(appSettings))
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

  &_bg
    background-size: cover
    background-position: center
    background-color: transparent

.ui-wrapper
  position: absolute
  width: 260px
  min-height: 100vh
  opacity: 1
  z-index: 9999
  overflow-x: hidden
  overflow-y: auto
  scrollbar-width: none
  &_customer
    .ui-container-toggle
      border-top: 4px solid #858585

  & > div
    display: none
    background-color: rgba(33, 33, 33, .95)
    padding: 10px

  &:hover > div
    display: block

  &::-webkit-scrollbar
    display: none


.ui-container-toggle
  position: absolute

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

#canvas-container
  width: 100vw
  height: 100vh

#video
  position: absolute
  width: 100vw
  height: 100vh
  object-fit: cover
</style>
