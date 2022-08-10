<template>
  <!-- Temperature -->
  <template v-if="wavelet.event.name == TEMP_C">
    <div :class="'shine' + (wavelet.options.fadein ? ' shine_fadein' : '' ) + (wavelet.options.fadeout ? ' shine_fadeout' : '' )" :style="('left:' + (wavelet.x - wavelet.size*1/2) + 'px; top:' + (wavelet.y - wavelet.size*1/2) + 'px;')
           + ('width: ' + wavelet.size*1 + 'px;' + 'height: ' + wavelet.size*1 + 'px;') + ('background-color:' + wavelet.color + ';') +
           ('-webkit-filter: blur(' + wavelet.size/5 + 'px)')"></div>
    <div :class="'wavelet' + (wavelet.options.fadein ? ' wavelet_fadein' : '' ) + (wavelet.options.fadeout ? ' wavelet_fadeout' : '' )"
         :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;')">
          <!-- + ('background-image: url(static/wavelet-anim-last-ring.svg?v='+generate()+');') -->
        <span :class="'wavelet__value'"
              :style="`font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{
            wavelet.event.value ? wavelet.event.value : '-'
          }}°</span>
      <div v-if="wavelet.colored" class="wavelet-coloring" :style="`background-color: ${wavelet.color}`"></div>
    </div>
  </template>
  <!-- All other -->
  <template v-else>
    <div :class="'wavelet' + (wavelet.options.fadein ? ' wavelet_fadein' : '' ) + (wavelet.options.fadeout ? ' wavelet_fadeout' : '' )"
         :style="('left:' + (wavelet.x - wavelet.size/2) + 'px; top:' + (wavelet.y - wavelet.size/2) + 'px;')
           + ('width: ' + wavelet.size + 'px;' + 'height: ' + wavelet.size + 'px;')">
          <!-- + ('background-image: url(static/wavelet-anim-last-ring.svg?v='+generate()+');')-->
      <span class="wavelet__value" v-if="wavelet.debug"
            :style="`color: green; font-size: ${wavelet.size/10 < 6 ? 6 : wavelet.size/10}px;`">{{ wavelet.event.name ? wavelet.event.name : '-' }}</span>
    </div>
  </template>

</template>

<script setup>
import {defineProps} from "vue"
import WaveletElement from "@/assets/js/classes/WaveletElement"
import {TEMP_C} from "@/assets/js/classes/events/EventsConfig"
// eslint-disable-next-line
import {generate} from "@/assets/js/helpers/id";
// eslint-disable-next-line
const props = defineProps({
  wavelet: WaveletElement,
})
</script>

<style scoped lang="sass">



.wavelet
  background-image: url(@/assets/img/wavelet-anim-continous-thick.svg) //currently using the file from the static folder for recreation wavelets with a pseudo different backgrounds (?v=xxxx)
  background-size: contain
  background-position: center
  position: absolute
  transition: opacity 1s
  transform: translate3d(0,0,0)
  opacity: 0
  &_fadein
    opacity: 1
  &_fadeout
    opacity: 0
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


.wavelet-coloring
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  border-radius: 100%
  mix-blend-mode: multiply

.shine
  background-size: contain
  background-position: center
  position: absolute
  background-color: white
  border-radius: 100%
  opacity: 0
  transition: opacity 1s
  transform: translate3d(0,0,0)
  &_fadein
    opacity: 1
  &_fadeout
    opacity: 0
</style>
