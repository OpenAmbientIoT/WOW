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
    <!-- SVG -->
    <template v-for="[key, wavelet] in wavelets" :key="key">
      <SvgWaveletComponent :wavelet="wavelet"/>
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

    <div class="ui-wrapper mb-3" :style="uiConfiguration.positions[uiPosition].style">
      <div class="ui-container-toggle" :style="(idsMap.size === 0 ? 'display: block !important; ' : '')">

        <!--CSV upload-->
        <div class="mb-3">
          <label for="map-file-upload" class="form-label small"><span class="text-white-50">Upload map CSV</span>
            (<span
                :style="idsMap.size === 0 ? 'color: red' : 'color: green'"> {{ idsMap.size }} ids loaded</span>)</label>
          <input class="form-control form-control-sm" id="map-file-upload" type="file" @change="openFile">
        </div>
        <hr>

        <div class="accordion">
          <!-- MQTT-->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-mqtt">
                MQTT
                <!-- Connection status -->
                <span class="connection-status ms-1" :class="connectionStatus"
                      :style="'background-color:' + connectionStatus + '; opacity: ' + (connectionState ? 1 : .4) + ';'"></span>

              </button>
            </div>
            <div id="accordion-item-mqtt" class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="text-white-50 mb-3">
                  <div class="text-white-50 me-3 mb-1">Publishing</div>
                  <textarea class="form-control mb-1" id="mqtt-pub-message" rows="4"
                            v-model="mqttMessageToSend"></textarea>
                  <div class="d-grid gap-1">
                    <button class="btn btn-sm btn-primary" @click="sendMqttMessage(mqttClient)">Send</button>
                  </div>
                </div>
                <div class="text-white-50 mb-3">
                  <div class="small text-muted">Events total: {{ eventsCounter }}</div>
                  <div class="small text-muted">Events per second: {{ eventsPerSecond }}</div>
                  <hr>

                  <div class="text-white-50 me-3 mb-1">WebSocket Connection</div>
                  <div class="small mb-4">
                    <span class="opacity-75 fw-lighter">Host:</span> <input class="form-control form-control-sm mb-1"
                                                                            placeholder="Host"
                                                                            @change="updateMqttSettings()"
                                                                            v-model="mqttHost">
                    <span class="opacity-75 fw-lighter">Port:</span> <input class="form-control form-control-sm mb-1"
                                                                            type="number" placeholder="Port"
                                                                            @change="updateMqttSettings()"
                                                                            v-model="mqttPort">
                    <span class="opacity-75 fw-lighter">Topic:</span> <input class="form-control form-control-sm mb-1"
                                                                             placeholder="Topic"
                                                                             @change="updateMqttSettings()"
                                                                             v-model="mqttTopic">
                    <span class="opacity-75 fw-lighter">User:</span> <input class="form-control form-control-sm mb-1"
                                                                            placeholder="User"
                                                                            @change="updateMqttSettings()"
                                                                            v-model="mqttUsername">
                    <span class="opacity-75 fw-lighter">Pass:</span> <input class="form-control form-control-sm mb-1"
                                                                            placeholder="Pass"
                                                                            @change="updateMqttSettings()"
                                                                            type="password"
                                                                            v-model="mqttPassword">
                  </div>
                  <div class="btn-group btn-group-sm w-100" role="group">
                    <button type="button" class="btn btn-primary w-100"
                            v-on:click="disconnect()">Disconnect
                    </button>
                    <button type="button" class="btn btn-primary w-100"
                            v-on:click="connect()">Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- Example-->
          <div class="accordion-item d-none">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-example">
                Example
              </button>
            </div>
            <div id="accordion-item-example" class="accordion-collapse collapse">
              <div class="accordion-body">
              </div>
            </div>
          </div>


          <!-- Simulate wavelets switch -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-simulation">
                Simulation
              </button>
            </div>
            <div id="accordion-item-simulation" class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" v-model="simulationMode" id="sim-checkbox"
                         @change="simulationSwitched">
                  <label class="form-check-label" for="sim-checkbox" style="color: white">
                    Enable
                  </label>
                </div>
                <div class="form-check form-switch mb-3">
                  <input class="form-check-input" type="checkbox" v-model="enablePublish" id="enable-publish"
                         @change="enablePublishSwitched">
                  <label class="form-check-label" for="enable-publish" style="color: white">
                    Publish <sup class="text-white-50">β</sup>
                  </label>
                </div>
                <div>
                  <div class="text-white-50 me-3 mb-2 small">Events per second</div>
                  <input class="form-control form-control-sm mb-2" type="number" placeholder="Set amount"
                         style="max-width: 110px" v-model="simulatedAverageEventsPerSecond">
                </div>
              </div>
            </div>
          </div>
          <!-- Grid view switch -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-grid">
                Grid
              </button>
            </div>
            <div id="accordion-item-grid" class="accordion-collapse collapse">
              <div class="accordion-body">
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
            </div>
          </div>
          <!-- Background -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-background">
                Background
              </button>
            </div>
            <div id="accordion-item-background" class="accordion-collapse collapse">
              <div class="accordion-body"><!-- Background image -->
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
            </div>
          </div>

          <!--Play sound-->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-sound"
              >
                Sound
              </button>
            </div>
            <div id="accordion-item-sound" class="accordion-collapse collapse">
              <div class="accordion-body">
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
                  <label for="mp3-upload" class="form-label small"><span
                      class="text-white-50">Or upload mp3</span></label>
                  <input class="form-control form-control-sm" id="mp3-upload" type="file" @change="uploadMp3">
                </div>
              </div>
            </div>
          </div>


          <!-- Size-->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-sizes">
                Size
              </button>
            </div>
            <div id="accordion-item-sizes" class="accordion-collapse collapse">
              <div class="accordion-body">

                <!-- Basic wavelet size -->
                <div>
                  <div class="text-white-50 me-3 mb-2">Basic wavelet size ↔</div>
                  <input class="form-control form-control-sm mb-2" type="number" placeholder="Size in pixels"
                         style="max-width: 80px" v-model="basicSize">
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 32">32
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="basicSize = 64">64
                  </button>
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
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 32">32
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 64">64
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 128">128
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 196">196
                  </button>
                  <button type="button" class="btn btn-outline-secondary btn-sm me-2" v-on:click="diskSize = 256">256
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Proximity -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-proximity">
                Proximity
              </button>
            </div>
            <div id="accordion-item-proximity" class="accordion-collapse collapse">
              <div class="accordion-body">

                <div class="form-check form-switch mb-1">
                  <input class="form-check-input" type="checkbox" v-model="renderProximityPacketsStack"
                         id="render-packets-stack">
                  <label class="form-check-label" for="render-packets-stack"
                         style="color: white">
                    Render packets
                  </label>
                </div>

                <hr>

                <!-- Proximity size -->
                <div>
                  <div class="text-white-50 me-3 mb-2">Proximity size</div>
                  <input class="form-control form-control-sm mb-2 d-inline-block" type="number" placeholder="Offset"
                         style="max-width: 80px" v-model="proximityIndicatorSizeCalculationOffset"> <span
                    class="small text-muted">Offset</span>
                  <div></div>
                  <input class="form-control form-control-sm mb-2 d-inline-block" type="number" placeholder="Scale"
                         style="max-width: 80px" v-model="proximityIndicatorScaleFactor"> <span
                    class="small text-muted">Scale</span>
                  <div></div>
                  <input class="form-control form-control-sm mb-2 d-inline-block" type="number" placeholder="Scale"
                         style="max-width: 80px" v-model="proximityIndicatorSizeMultiplier"> <span
                    class="small text-muted">Multiplier</span>
                  <div class="text-muted mt-1 font-monospace" style="font-size: 9px">
                    ((offset + basic size) + scale * PVAL) * multiplier
                    <br>Result size will be: (10px&mdash;{{ basicSize }}px) * multiplier
                    {{ proximityIndicatorSizeMultiplier }}
                  </div>
                </div>
                <hr>

                <!-- Proximity indicator position -->
                <div>
                  <div class="text-white-50 me-3 mb-2">Proximity indicator position</div>
                  <input class="form-control form-control-sm mb-2 d-inline-block" type="number" placeholder="Offset"
                         style="max-width: 80px" v-model="proximityIndicatorPositionShiftX"> <span
                    class="small text-muted"> X shift</span>
                  <div></div>
                  <input class="form-control form-control-sm mb-2 d-inline-block" type="number" placeholder="Scale"
                         style="max-width: 80px" v-model="proximityIndicatorPositionShiftY"> <span
                    class="small text-muted"> Y shift</span>
                  <div class="text-muted mt-1 font-monospace" style="font-size: 9px">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RSSI-->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-rssi">
                RSSI
              </button>
            </div>
            <div id="accordion-item-rssi" class="accordion-collapse collapse">
              <div class="accordion-body">
                <!-- Rssi scale factor -->
                <div>
                  <div class="text-white-50 me-3 mb-2">RSSI scale factor</div>
                  <input class="form-control form-control-sm mb-2 d-inline-block" type="number"
                         placeholder="Size in pixels"
                         style="max-width: 80px" v-model="rssiScaleFactor"> <span
                    class="text-muted small ms-3"> Average RSSI {{ averageRssi }}</span>
                  <div class="text-muted mt-1 font-monospace" style="font-size: 9px">ui size * (scale/10) * (average
                    rssi/rssi)
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
              </div>
            </div>
          </div>

          <!-- Rendering -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-rendering">
                Rendering
              </button>
            </div>
            <div id="accordion-item-rendering" class="accordion-collapse collapse">
              <div class="accordion-body">

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
                    <input class="form-control form-control-sm mb-2" type="number" placeholder="Min t"
                           v-model="minCelsius">
                  </div>
                  <div class="col">
                    <div class="text-white-50 me-3 mb-2">Max t</div>
                    <input class="form-control form-control-sm mb-2" type="number" placeholder="Max t"
                           v-model="maxCelsius">
                  </div>
                </div>
                <hr>

                <!-- Rendering type -->
                <div>
                  <span class="text-white-50 me-1">Rendering type</span>
                  <div class="form-check form-switch mb-1" v-for="renderingType in renderingTypes"
                       :key="renderingType.name">
                    <input class="form-check-input" type="checkbox" v-model="renderingType.enabled"
                           v-on:change="renderingTypeChanged" :value="renderingType.name"
                           :id="`rendering-type-checkbox-${renderingType.name}`">
                    <label class="form-check-label" :for="`rendering-type-checkbox-${renderingType.name}`"
                           style="color: white">
                      {{ renderingType.name }} <sup><span class="small text-white-50">{{
                        renderingType.description
                      }}</span></sup>
                    </label>
                  </div>
                </div>

                <!--Coloring wavelets-->
                <div class="form-check form-switch mb-3 d-none">
                  <input class="form-check-input" type="checkbox" v-model="isColorWavelets"
                         id="color-wavelets-checkbox">
                  <label class="form-check-label" for="color-wavelets-checkbox" style="color: white">
                    Colorize wavelets
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Events -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-events">
                Events
              </button>
            </div>
            <div id="accordion-item-events" class="accordion-collapse collapse">
              <div class="accordion-body">

                <!-- Handle events -->
                <div>
                  <span class="text-white-50 me-1">Handle events</span>
                  <div class="form-check form-switch mb-1" v-for="eventType in eventsTypes" :key="eventType.name">
                    <input class="form-check-input" type="checkbox" v-model="eventType.enabled"
                           :id="`handle-wavelets-checkbox-${eventType.name}`">
                    <label class="form-check-label" :for="`handle-wavelets-checkbox-${eventType.name}`"
                           style="color: white">
                      {{ eventType.name }}
                    </label>
                  </div>
                </div>
                <hr>
              </div>
            </div>
          </div>

          <!-- Debug -->
          <div class="accordion-item">
            <div class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#accordion-item-debug">
                Debug
              </button>
            </div>
            <div id="accordion-item-debug" class="accordion-collapse collapse">
              <div class="accordion-body">

                <div class="form-check form-switch mb-1">
                  <input class="form-check-input" type="checkbox" v-model="debugMode" id="debug-wavelets-checkbox">
                  <label class="form-check-label" for="debug-wavelets-checkbox" style="color: rosybrown">
                    Debug mode
                  </label>
                </div>
                <hr>
                <!-- Console log -->
                <div>
                  <span class="text-white-50 me-1">Console log</span>
                  <div class="form-check form-switch mb-1" v-for="consoleSetting in consoleSettings"
                       :key="consoleSetting.name">
                    <input class="form-check-input" type="checkbox" v-model="consoleSetting.state.value"
                           :id="`console-log-checkbox-${consoleSetting.name}`">
                    <label class="form-check-label" :for="`console-log-checkbox-${consoleSetting.name}`"
                           style="color: white">
                      {{ consoleSetting.name }}
                    </label>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>  <!-- end of accordion -->


        <!--UI Position-->
        <div class="ui-position-toggle">
          <span class="text-white-50 mt-4 mb-2 me-2">UI position</span>
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-outline-light"
                    v-on:click="uiPosition = 0">Left
            </button>
            <button type="button" class="btn btn-outline-light"
                    v-on:click="uiPosition = 1">Right
            </button>
          </div>
        </div>

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

import WaveletElement from "@/assets/js/classes/WaveletElement";

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

import useProximity from "@/assets/js/hooks/useProximity"

const {
  calculateIndicatorSize,
  proximityIndicatorScaleFactor,
  proximityIndicatorSizeCalculationOffset,
  proximityIndicatorSizeMultiplier,
  proximityIndicatorPositionShiftX,
  proximityIndicatorPositionShiftY,
  renderProximityPacketsStack,
} = useProximity()

import useEventsCounter from "@/assets/js/hooks/useEventsCounter"

const {eventsCounter, eventsPerSecond, eventsStartedAtMs, averageEventsPerSecond} = useEventsCounter()

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

import useMqtt from "@/assets/js/hooks/useMqtt";

const {mqttHost, mqttPort, mqttTopic, mqttUsername, mqttPassword, mqttClient, updateMqttSettings} = useMqtt()


function connect() {
  mqttClient.doUnSubscribe()
  mqttClient.destroyConnection()
  mqttClient.createConnection(processMessage, renderConnectionStatus)
  mqttClient.doSubscribe()
}

function disconnect() {
  mqttClient.doUnSubscribe()
  mqttClient.destroyConnection()
  connectionStatus.value = 'red'
}

import useSendMqttMessage from "@/assets/js/hooks/useSendMqttMessage";

const {mqttMessageToSend, sendMqttMessage} = useSendMqttMessage()


import {eventsConfig, PACKET, RSSI, TEMP_C} from "@/assets/js/classes/events/EventsConfig";
import {renderingConfig, SVG} from "@/assets/js/classes/RenderingConfig";


let renderingTypes = reactive(renderingConfig.types)

let rssiResizeEvents = reactive(rssiConfig.resizeEvents)
if (appSettings.rssiResizeEvents && appSettings.rssiResizeEvents.length === rssiConfig.resizeEvents.length) {
  rssiResizeEvents = reactive(appSettings.rssiResizeEvents)
}

// Event types
let eventsTypes = reactive(eventsConfig.eventsTypes)
if (appSettings.eventsTypes && appSettings.eventsTypes.length === eventsConfig.eventsTypes.length) {
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
import EventsBuilder from "@/assets/js/classes/EventsBuilder"


const minCelsius = ref(20)
const maxCelsius = ref(30)
const averageRssi = ref(70)
//let lastRssiCalculation = 0


import {toSize, rssiConfig, isRssiSizeForEventEnabled} from "@/assets/js/helpers/rssi";

// Parse event message, create wavelet element, inject necessary data into wavelet
import {isObject} from "@/assets/js/helpers/check"

function processMessage(message) {
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

        // When non TEMP_C event check if we have already TEMP_C wavelet (to continue render of color disc)
        if (event.name !== TEMP_C && wavelets.value.has(event.tag)) {
          const existing = wavelets.value.get(event.tag) // existing is 100% not null here
          if (existing.event.name === TEMP_C) {
            // Skip the all other events if TEMP_C wavelet already exists and renders
            // (before lifetime of 10s is not passed)
            if (existing.options.ringsFadeout !== true) {
              return false;
            }
            wavelet.predecessor = existing
          } else if (existing.predecessor && existing.predecessor.event.name === TEMP_C) {
            wavelet.predecessor = existing.predecessor
          }

          // Special processing for PACKET events
          if (event.name === PACKET) {

            // Non-proximity packet processing
            if (isObject(wavelet.event.value) && !('PVAL' in wavelet.event.value)) {

              // Moved here from inspectWavelets()
              // Create TEMP_C predecessor if it's a first render to show whole wavelet (not PACKET ring) and temperature value
              if (!wavelet.predecessor) {
                wavelet.predecessor = {...wavelet}
                //wavelet.predecessor.event.name = TEMP_C
              }
              // Overwrite temperature if wavelet has TEMP predecessor
              //wavelet.predecessor.event.value = Number.parseFloat(wavelet.event.value.TEMP).toFixed(1)
              wavelet.predecessor.diskSize = diskSize.value
              // Colorize
              const color = rgbColor(wavelet.predecessor.event.value.TEMP, minCelsius.value, maxCelsius.value)
              const rgb = color ? `rgb(${color[0]},${color[1]},${color[2]})` : null
              wavelet.color = rgb
              wavelet.predecessor.color = rgb
            }

            // Any PACKET
            if (event.name === PACKET) {

              // Create packets stack to render multiply SVGs (packet coming ring peak)
              if (existing) {
                const existingStack = Array.from(existing.packets.stack)
                wavelet.packets.stack = new Set(existingStack)
                wavelet.packets.stack.add(event.created)
              }
            }
          }
        }


        // Proximity packet processing
        if (event.name === PACKET) {
          let isTouched = false
          if (isObject(wavelet.event.value) && ('PVAL' in wavelet.event.value)) {
            wavelet.proximity.indicator.positionShift = [proximityIndicatorPositionShiftX.value, proximityIndicatorPositionShiftY.value]
            // Proximity indicator size (based on PVAL)
            wavelet.proximity.indicator.size = calculateIndicatorSize(wavelet.event.value.PVAL, basicSize.value)
            wavelet.proximity.renderPackets = renderProximityPacketsStack.value
            if ('PROX' in wavelet.event.value && wavelet.event.value.PROX === '1') {
              isTouched = true
            }
          }

          isTouched ? wavelet.packets.pulse = true : null //!existing.packets.pulse : null
          if (wavelet.packets.pulse) {
            wavelet.packets.lastPulse = new Date().getTime()
          }
        }

        if (!wavelet.color) {
          const temp = isObject(wavelet.event.value) ? wavelet.event.value.TEMP : wavelet.event.value
          const color = rgbColor(temp, minCelsius.value, maxCelsius.value)
          wavelet.color = color ? `rgb(${color[0]},${color[1]},${color[2]})` : null
        }

        // Calculate size
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
        // Add wavelet to render list
        wavelets.value.set(event.tag, wavelet)

        // Events counter (currently counting only parsed and added events)
        eventsCounter.value++
        if (eventsStartedAtMs.value === null) {
          eventsStartedAtMs.value = new Date().getTime()
        }
        averageEventsPerSecond() // update count


        // Console
        if (consoleRenderingInfo.value) console.log('Tag ' + event.tag + ' (' + event.timestamp + ' / ' + humanReadableTime(event.timestamp) + ') is in map. Render.')

        // Sound
        if (isSoundOn.value) {
          if (isSoundSimultaneous.value) {
            sound = new Audio(soundFilePath)
          }
          sound.play()
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

function enablePublishSwitched() {
  if (simulationMode.value === true) {
    connect()
  }
  connectionStatus.value = 'blue'
  publishLoop(mqttClient, eventsTypes, idsMap)
}

const simulatedAverageEventsPerSecond = ref(1)
import useSimulation from "@/assets/js/hooks/useSimulation";

const {generateMessage} = useSimulation()

import usePublish from "@/assets/js/hooks/usePublish";

const {enablePublish, publishLoop} = usePublish()


function runSimulation() {
  if (simulationMode.value === false) {
    return false
  }
  connectionState.value = !connectionState.value
  const message = generateMessage(eventsTypes, idsMap.value)
  processMessage(message)
  const divider = simulatedAverageEventsPerSecond.value > 0 ? simulatedAverageEventsPerSecond.value : 1
  setTimeout(runSimulation, 1000 / divider)
}

const connectionState = ref(true)
const connectionStatus = ref('red')

function renderConnectionStatus(status) {
  connectionState.value = !connectionState.value
  connectionStatus.value = status
}


function inspectWavelets() {
  const now = Date.now()
  wavelets.value.forEach((wavelet) => {
    let lifetime = 5 // seconds for wavelets
    let lifetimePacket = 1 // seconds for PACKET events
    let ringsFadeoutTime = 1
    let waveletFadeoutTime = 1
    let ringsLifetime = lifetime

    // Special case for PACKET events (some logic moved to processMessage())
    if (wavelet.event.name === PACKET && !('PVAL' in wavelet.event.value)) {
      //lifetime = lifetimePacket
      //ringsLifetime = lifetimePacket
      ringsFadeoutTime = .1
      waveletFadeoutTime = .1
    }

    if (wavelet.event.name === PACKET && 'PVAL' in wavelet.event.value) {
      lifetime = 30
      // If passed pulse time (.3s) then make pulse option false to remove pulse class
      if (new Date().getTime() - wavelet.packets.lastPulse > 300) {
        wavelet.packets.pulse = false
      }
    }

    // Clear old packets stack (which used for rendering multiple SVG ring peaks)
    wavelet.packets.stack.forEach(created => {
      if (now - created > lifetimePacket * 600) {
        wavelet.packets.stack.delete(created);
      }
    });

    // Extend temperature wavelets lifetime (based on specified color disc time)
    if (wavelet.event.name === PACKET || wavelet.event.name === TEMP_C || (wavelet.predecessor && wavelet.predecessor.event.name === TEMP_C)) {
      const temperatureWaveletLifetime = temperatureDiskTimeout.value
      lifetime = lifetime < temperatureWaveletLifetime ? temperatureWaveletLifetime : lifetime
    }

    // Fadein
    if (!wavelet.options.fadein) {
      if (consoleFadingInfo.value) console.log('Time to fadein for #' + wavelet.event.tag)
      wavelet.options.fadein = true
      if (wavelet.predecessor) {
        wavelet.predecessor.options.fadein = true
      }
    }

    // Start fadeout for wavelet rings for temperature events earlier than fadeout whole wavelet
    const milliseconds = now - wavelet.created
    const passedSeconds = Math.floor(milliseconds / 1000)
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
    appSettings.mqttHost ? mqttHost.value = appSettings.mqttHost : null
    appSettings.mqttPort ? mqttPort.value = appSettings.mqttPort : null
    appSettings.mqttTopic ? mqttTopic.value = appSettings.mqttTopic : null
    appSettings.mqttUsername ? mqttUsername.value = appSettings.mqttUsername : null
    appSettings.mqttPassword ? mqttPassword.value = appSettings.mqttPassword : null


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
      eventsTypes,
      debugMode,
      rssiResizeEvents,
      consoleEvents,
      consoleRenderingInfo,
      consoleLifetimeInfo,
      consoleFadingInfo,
      mqttHost,
      mqttPort,
      mqttTopic,
      mqttUsername,
      mqttPassword,
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
       eventsTypesNew,
       debugModeNew,
       rssiResizeEventsNew,
       consoleEventsNew,
       consoleRenderingInfoNew,
       consoleLifetimeInfoNew,
       consoleFadingInfoNew,
       mqttHostNew,
       mqttPortNew,
       mqttTopicNew,
       mqttUsernameNew,
       mqttPasswordNew,
     ]) => {
      console.log('Settings watcher triggered')
      if (!appSettings) {
        console.log('No appSettings yet')
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

      appSettings.eventsTypes = eventsTypesNew
      appSettings.debugMode = debugModeNew
      appSettings.rssiResizeEvents = rssiResizeEventsNew

      appSettings.consoleEvents = consoleEventsNew
      appSettings.consoleRenderingInfo = consoleRenderingInfoNew
      appSettings.consoleLifetimeInfo = consoleLifetimeInfoNew
      appSettings.consoleFadingInfo = consoleFadingInfoNew

      appSettings.mqttHost = mqttHostNew
      appSettings.mqttPort = mqttPortNew
      appSettings.mqttTopic = mqttTopicNew
      appSettings.mqttUsername = mqttUsernameNew
      appSettings.mqttPassword = mqttPasswordNew

      console.log('Saving setting to local storage...')
      localStorage.setItem('appSettings', JSON.stringify(appSettings))
      console.log('Saved.')
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
  width: 300px
  min-height: 100vh
  opacity: 1
  z-index: 9999
  overflow-x: hidden
  overflow-y: auto
  scrollbar-width: none

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
  min-height: 100vh
  padding-bottom: 40px

.ui-position-toggle
  position: absolute
  bottom: 10px

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

#video
  position: absolute
  width: 100vw
  height: 100vh
  object-fit: cover

// Accordion
.accordion
  margin-bottom: 40px

.accordion-item
  background: transparent
//border-color: rgba(33, 33, 33, .95)

.accordion-body
  background-color: rgba(0, 0, 0, .2)
//border: 1px solid $accordion-border-color


</style>
